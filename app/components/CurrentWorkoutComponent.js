import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function CurrentWorkoutComponent({
    currentWorkout,
    setCurrentWorkout,
    currentActivityIndex,
    setCurrentActivityIndex,
    currentSet,
    setCurrentSet,
    currentWorkoutName,
    workoutType,
    currentWorkoutID,
}) {
    const { data: session, status } = useSession();
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const currentDate = new Date();
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const currentDay = daysOfWeek[currentDate.getDay()];
    const stringDate = `${
        currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    const maxRounds = currentWorkout.length;
    const highestSetNumber = Math.max(
        ...currentWorkout.map((item) => item.sets)
    );
    const highestSetIndex = currentWorkout.findLastIndex(
        (item) => item.sets === highestSetNumber
    );

    const handleChangeAmount = (e) => {
        if (e.target.name === "reps") {
            let newReps = currentWorkout[currentActivityIndex].reps;

            newReps[currentSet] += Number(e.target.value);
            if (newReps[currentSet] < 0) {
                newReps[currentSet] = 0;
            }
            const tempWorkoutArray = currentWorkout.map((object) =>
                object === currentWorkout[currentActivityIndex]
                    ? { ...object, reps: newReps }
                    : object
            );
            setCurrentWorkout(tempWorkoutArray);
        }
        if (e.target.name === "weight") {
            let newWeight = currentWorkout[currentActivityIndex].weight;
            newWeight[currentSet] += Number(e.target.value);
            if (newWeight[currentSet] < 0) {
                newWeight[currentSet] = 0;
            }
            const tempWorkoutArray = currentWorkout.map((object) =>
                object === currentWorkout[currentActivityIndex]
                    ? { ...object, weight: newWeight }
                    : object
            );
            setCurrentWorkout(tempWorkoutArray);
        }
        if (e.target.name === "minTime") {
            let newTime = currentWorkout[currentActivityIndex].time;
            newTime[currentSet] += Number(e.target.value);
            if (newTime[currentSet] < 0) {
                newTime[currentSet] = 0;
            }
            const tempWorkoutArray = currentWorkout.map((object) =>
                object === currentWorkout[currentActivityIndex]
                    ? { ...object, time: newTime }
                    : object
            );
            setCurrentWorkout(tempWorkoutArray);
        }
    };

    const handleNext = () => {
        if (workoutType === "straightSets") {
            // If current set is the last set of the last activity, do nothing
            if (
                currentSet + 1 === currentWorkout[currentActivityIndex].sets &&
                currentActivityIndex + 1 === maxRounds
            ) {
                return;
            }
            // If current set is the last set of the current activity, go to the next activity and reset the currentSet for that activity
            if (currentSet + 1 === currentWorkout[currentActivityIndex].sets) {
                setCurrentSet(0);
                setCurrentActivityIndex(currentActivityIndex + 1);
                return;
            }
            // Otherwise, just increment the set
            setCurrentSet(currentSet + 1);
        }
        if (workoutType === "circuitSets") {
            console.log("circuits");
            if (
                currentActivityIndex + 1 === highestSetIndex &&
                currentSet + 1 === highestSetNumber
            ) {
                return;
            }
            let nextActivityIndex = -1;
            // Check if current round in the circuit has the current set
            for (let i = currentActivityIndex + 1; i < maxRounds; i++) {
                if (currentWorkout[i].sets > currentSet) {
                    nextActivityIndex = i;
                    break;
                }
            }
            // If an activity in the current round has the current set, set the current activity to that activity
            if (nextActivityIndex !== -1) {
                setCurrentActivityIndex(nextActivityIndex);
                return;
            } else {
                // No more activities have the current set, so increment the set and find the next activity that has that set
                if (currentSet + 1 < highestSetNumber) {
                    setCurrentSet(currentSet + 1);
                    for (let i = 0; i < maxRounds; i++) {
                        if (currentWorkout[i].sets > currentSet) {
                            setCurrentActivityIndex(i);
                            return;
                        }
                    }
                }
            }
        }
    };

    const handlePrevious = () => {
        if (workoutType === "straightSets") {
            if (currentSet === 0 && currentActivityIndex === 0) {
                return;
            }
            // If current set is 0, go to the previous activity and reset the currentSet for that activity
            if (currentSet === 0) {
                setCurrentSet(
                    currentWorkout[currentActivityIndex - 1].sets - 1
                );
                setCurrentActivityIndex(currentActivityIndex - 1);
                return;
            }
            // Otherwise, just decrement the set
            setCurrentSet(currentSet - 1);
        }
        if (workoutType === "circuitSets") {
            if (currentSet === 0 && currentActivityIndex === 0) {
                return;
            }

            let previousActivityIndex = -1;
            // Check if current round in the circuit has the current set
            for (let i = currentActivityIndex - 1; i >= 0; i--) {
                if (currentWorkout[i].sets > currentSet) {
                    previousActivityIndex = i;
                    break;
                }
            }
            // If current round in the circuit has the current set, set the current activity to that round
            if (previousActivityIndex !== -1) {
                setCurrentActivityIndex(previousActivityIndex);
                return;
            } else { 
                // No more activities have the current set, so decrement the set and find the next activity that has that set
                if (currentSet > 0) {
                    setCurrentSet(currentSet - 1);
                    for (let i = maxRounds - 1; i >= 0; i--) {
                        if (currentWorkout[i].sets > currentSet - 1) {
                            setCurrentActivityIndex(i);
                            return;
                        }
                    }
                }
            }
        }
    };

    const handleSaveWorkout = async () => {
        setIsSaving(true);
        setSaveMessage("Saving...");
        await axios.post("/api/submitWorkout", {
            uid: session.user.id,
            workoutName: currentWorkoutName,
            workoutArray: currentWorkout,
            workoutID: currentWorkoutID,
        });
        setSaveMessage("");
        setIsSaving(false);
    };

    return (
        <div className="flex flex-col">
            <div className="my-1 p-2 border border-r-1 border-teal-500 w-full">
                <h4 className="text-3xl font-bold text-center text-purple-500">
                    Workout:
                </h4>
                <h4 className="text-xl">
                    <span className="text-purple-500">Day:</span> {currentDay},{" "}
                    {stringDate}
                </h4>
                <h4 className="text-xl">
                    <span className="text-purple-500">Name:</span>{" "}
                    {currentWorkoutName}
                </h4>
                <h4 className="text-xl">
                    <span className="text-purple-500">Activity:</span>{" "}
                    {currentActivityIndex + 1} of {maxRounds},{" "}
                    {currentWorkout[currentActivityIndex].activity}
                </h4>
                <h4 className="text-xl">
                    <span className="text-purple-500">Set</span>{" "}
                    {currentSet + 1} of{" "}
                    {currentWorkout[currentActivityIndex].sets}
                </h4>
            </div>
            {currentWorkout[currentActivityIndex].weight[currentSet] > 0 ? (
                <div className="my-1 flex flex-row p-2 border border-r-1 border-teal-500 w-full">
                    <h4 className="text-xl">
                        <span className="text-purple-500">Weight:</span>{" "}
                        {
                            currentWorkout[currentActivityIndex].weight[
                                currentSet
                            ]
                        }
                        <span className="text-green-500 pl-1">
                            {currentWorkout[currentActivityIndex].weight[
                                currentSet
                            ] < 2
                                ? "lb"
                                : "lbs"}
                        </span>
                    </h4>
                    <button
                        onClick={handleChangeAmount}
                        value={-5}
                        className="bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl"
                        name="weight"
                    >
                        -
                    </button>
                    <button
                        onClick={handleChangeAmount}
                        value={5}
                        className="bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl"
                        name="weight"
                    >
                        +
                    </button>
                </div>
            ) : null}
            {currentWorkout[currentActivityIndex].reps[currentSet] > 0 ? (
                <div className="my-1 flex flex-row p-2 border border-r-1 border-teal-500 w-full">
                    <h4 className="text-xl">
                        <span className="text-purple-500"># of Reps:</span>{" "}
                        {currentWorkout[currentActivityIndex].reps[currentSet]}
                    </h4>
                    <button
                        onClick={handleChangeAmount}
                        value={-1}
                        className="bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl"
                        name="reps"
                    >
                        -
                    </button>
                    <button
                        onClick={handleChangeAmount}
                        value={1}
                        className="bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl"
                        name="reps"
                    >
                        +
                    </button>
                </div>
            ) : null}
            {currentWorkout[currentActivityIndex].cooldown[currentSet] > 0 ? (
                <div className="my-1 p-2 border border-r-1 border-teal-500 w-full">
                    <h4 className="text-xl">
                        <span className="text-purple-500">Cooldown time:</span>{" "}
                        {currentWorkout[currentActivityIndex]?.cooldown[
                            currentSet
                        ]
                            ? currentWorkout[currentActivityIndex].cooldown[
                                  currentSet
                              ]
                            : null}{" "}
                        <span className="text-green-500">s</span>
                    </h4>
                </div>
            ) : null}
            {currentWorkout[currentActivityIndex].time[currentSet] > 0 ? (
                <div className="my-1 p-2 border border-r-1 border-teal-500 w-full">
                    {currentWorkout[currentActivityIndex].time[currentSet] ===
                    "" ? null : (
                        <div className="flex flex-row">
                            <h4 className="text-xl">
                                <span className="text-purple-500">
                                    Activity Time:
                                </span>{" "}
                                {
                                    currentWorkout[currentActivityIndex].time[
                                        currentSet
                                    ]
                                }
                            </h4>
                            <button
                                onClick={handleChangeAmount}
                                value={-1}
                                className="bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl"
                                name="minTime"
                            >
                                -1
                            </button>
                            <button
                                onClick={handleChangeAmount}
                                value={-5}
                                className="bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl"
                                name="minTime"
                            >
                                -5
                            </button>
                            <button
                                onClick={handleChangeAmount}
                                value={5}
                                className="bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl"
                                name="minTime"
                            >
                                +5
                            </button>
                            <button
                                onClick={handleChangeAmount}
                                value={1}
                                className="bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl"
                                name="minTime"
                            >
                                +1
                            </button>
                        </div>
                    )}
                </div>
            ) : null}
            <div className="my-1 flex flex-row space-x-2 justify-evenly">
                <button
                    onClick={handlePrevious}
                    className="bg-purple-500 hover:bg-purple-400 disabled:bg-gray-500 rounded px-2 flex-grow"
                    disabled={currentSet === 0 && currentActivityIndex === 0}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="bg-purple-500 hover:bg-purple-400 rounded px-2 disabled:bg-gray-500 flex-grow"
                    // disabled={
                    //     currentSet + 1 ===
                    //         currentWorkout[currentActivityIndex].sets &&
                    //     currentActivityIndex + 1 == maxRounds
                    // }
                >
                    Next
                </button>
            </div>
            <div className="my-1">
                    <button
                        onClick={handleSaveWorkout}
                        disabled={isSaving}
                        className="bg-purple-500 hover:bg-purple-400 rounded px-2 w-full"
                    >
                        Save Workout
                    </button>
                {saveMessage != "" ? (
                    <h4 className="text-xl">{saveMessage}</h4>
                ) : null}
            </div>
        </div>
    );
}
