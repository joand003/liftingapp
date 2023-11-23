"use client";
import React, { useState, useEffect } from "react";
import CooldownTimer from "../components/CooldownTimer";
import ActivityTimer from "../components/ActivityTimer";
import CurrentWorkoutComponent from "../components/CurrentWorkoutComponent";
import WorkoutProgress from "../components/WorkoutProgress";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [exerciseListArray, setExerciseListArray] = useState([]);
    const [exerciseNameArray, setExerciseNameArray] = useState([]);
    const [exerciseIDArray, setExerciseIDArray] = useState([]);
    const [currentWorkout, setCurrentWorkout] = useState([
        {
            activity: "",
            weight: [0],
            sets: 1,
            reps: [0],
            cooldown: [0],
            time: [0],
        },
    ]);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const [currentWorkoutID, setCurrentWorkoutID] = useState("");
    const [currentSet, setCurrentSet] = useState(0);
    const [currentWorkoutName, setCurrentWorkoutName] =
        useState("Select a workout");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentCooldownTime, setCurrentCooldownTime] = useState(0);
    const [currentActivityTime, setCurrentActivityTime] = useState(0);
    const [workoutType, setWorkoutType] = useState("straightSets");
    const [selectedActivity, setSelectedActivity] = useState("Jump to activity");

    const handleSelectWorkout = (e) => {
        const index =
            e.target.options[e.target.selectedIndex].getAttribute("data-index");
        setCurrentWorkout(exerciseListArray[index]);
        setCurrentWorkoutName(exerciseNameArray[index]);
        setCurrentWorkoutID(exerciseIDArray[index]);
        setCurrentActivityIndex(0);
        setCurrentSet(0);
        setSelectedActivity("Jump to activity");
    };

    const loadExistingWorkouts = async () => {
        setErrorMessage("");
        const response = await axios.post("/api/queryExerciseList", {
            uid: session.user.id,
        });
        if (response.data.data.length === 0) {
            setErrorMessage("You have no workouts to edit");
            return;
        }
        const tempWorkoutArray = response.data.data.map((item) => {
            return item.workoutArray;
        });
        const tempExerciseNameArray = response.data.data.map((item) => {
            return item.workoutName;
        });
        const tempExerciseIDArray = response.data.data.map((item) => {
            return item.workoutID;
        });
        setExerciseNameArray(tempExerciseNameArray);
        setExerciseListArray(tempWorkoutArray);
        setExerciseIDArray(tempExerciseIDArray);
    };

    const handleWorkoutType = (e) => {
        setWorkoutType(e.target.value);
    };

    useEffect(() => {
        if (status === "authenticated" && session) {
            loadExistingWorkouts();
        }
    }, [session, status]);

    useEffect(() => {
        setCurrentCooldownTime(
            currentWorkout[currentActivityIndex].cooldown[currentSet]
        );
        setCurrentActivityTime(
            currentWorkout[currentActivityIndex].time[currentSet] * 60
        );
    }, [currentActivityIndex, currentSet, currentWorkout]);

    return (
        <div className="flex justify-center">
            <div className="flex flex-col sm:flex-row">
                <div>
                    <div className="">
                        <h1 className="text-4xl text-center">Dashboard</h1>
                        {exerciseListArray.length != 0 ? (
                            <h4 className="text-xl">Select your workout:</h4>
                        ) : (
                            <h4>
                                Create a new workout using the workout creator.
                            </h4>
                        )}
                        {exerciseNameArray.length === 0 ? (
                            <p>Please refresh to load your data.</p>
                        ) : (
                            <select
                                className="w-full my-1 text-slate-800 text-center"
                                name="workout"
                                id="workout"
                                placeholder="Select a workout"
                                value={currentWorkoutName}
                                onChange={handleSelectWorkout}
                            >
                                <option
                                    value="Select a workout"
                                    disabled={
                                        currentWorkoutName !==
                                        "Select a workout"
                                    }
                                >
                                    Select a workout
                                </option>
                                {exerciseNameArray.map((item, index) => {
                                    return (
                                        <option
                                            value={item}
                                            key={index + "exerciseArrays"}
                                            data-index={index}
                                        >
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                        )}
                        <div>
                            <label className="">Straight Sets</label>
                            <input
                                type="radio"
                                name="workoutType"
                                value="straightSets"
                                className="mx-2"
                                onChange={handleWorkoutType}
                                checked={workoutType === "straightSets"}
                            />
                            <label className="">Circuit Sets</label>
                            <input
                                type="radio"
                                name="workoutType"
                                value="circuitSets"
                                className="mx-2"
                                onChange={handleWorkoutType}
                                checked={workoutType === "circuitSets"}
                            />
                        </div>
                    </div>
                    <div className="">
                        {errorMessage === "" &&
                        currentWorkoutName !== "Select a workout" ? (
                            <CurrentWorkoutComponent
                                workoutType={workoutType}
                                currentWorkout={currentWorkout}
                                setCurrentWorkout={setCurrentWorkout}
                                currentActivityIndex={currentActivityIndex}
                                setCurrentActivityIndex={
                                    setCurrentActivityIndex
                                }
                                currentSet={currentSet}
                                setCurrentSet={setCurrentSet}
                                currentWorkoutName={currentWorkoutName}
                                currentWorkoutID={currentWorkoutID}
                                selectedActivity={selectedActivity}
                                setSelectedActivity={setSelectedActivity}
                            />
                        ) : (
                            <h4 className="text-xl">{errorMessage}</h4>
                        )}
                    </div>
                </div>
                <div className="sm:ml-6 flex flex-col lg:flex-row">
                    {/* <div className="">
                        <WorkoutProgress currentWorkout={currentWorkout}/>
                    </div> */}
                    <div className="sm:mt-16">
                        {currentWorkout[currentActivityIndex].time[
                            currentSet
                        ] === 0 ? null : (
                            <ActivityTimer activityTime={currentActivityTime} />
                        )}
                    </div>
                    <div className="lg:ml-6 lg:mt-16">
                        {errorMessage === "" &&
                        currentWorkoutName !== "Select a workout" ? (
                            <CooldownTimer cooldownTime={currentCooldownTime} />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
