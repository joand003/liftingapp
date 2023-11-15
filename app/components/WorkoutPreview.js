import React from 'react'

export default function WorkoutPreview({workoutArray, workoutName}) {
  return (
    // mx-4
    <div className="lg:ml-6">
        <h2 className="text-3xl mt-6">Workout Preview</h2>
        <p className="text-xl">
          <span className="font-bold text-purple-600">Workout Name:</span>{" "}
          {workoutName}
        </p>
        {workoutArray.map((item, index) => {
          return (
            <div
              className="mb-4 flex flex-col border border-r-1 border-teal-500 p-2 w-fit"
              key={index + "div"}
            >
              <p key={index + "activity"}>
                <span className="font-bold text-purple-600">
                  Activity {index + 1}:
                </span>{" "}
                {item.activity}
              </p>
              <p key={index + "sets"}>
                <span className="font-bold text-purple-600">Sets:</span>{" "}
                {item.sets}
              </p>
              <div className="flex flex-row max-w-min sm:min-w-max text-green-500">
                <div className="flex flex-col">
                  {item.weight.map((item, index) => {
                    if (item === "") {
                      return null;
                    }
                    return (
                      <p key={index + "weight"} className="pr-3 sm:pr-8">
                        <span className="font-bold text-purple-600">
                          Weight:
                        </span>{" "}
                        {item} {item < 2 ? "lb" : "lbs"}
                      </p>
                    );
                  })}
                </div>
                <div className="flex flex-col">
                  {item.reps.map((item, index) => {
                    if (item === "") {
                      return null;
                    }
                    return (
                      <p key={index + "reps"} className="pr-3 sm:pr-8">
                        <span className="font-bold text-purple-600">Reps:</span>{" "}
                        {item}
                      </p>
                    );
                  })}
                </div>
                <div className="flex flex-col">
                  {item.cooldown.map((item, index) => {
                    if (item === "") {
                      return null;
                    }
                    return (
                      <p key={index + "cd"} className="pr-3 sm:pr-8">
                        <span className="font-bold text-purple-600">
                          Cooldown:
                        </span>{" "}
                        {item} s
                      </p>
                    );
                  })}
                </div>
                <div className="flex flex-col">
                  {item.time.map((item, index) => {
                    if (item === "") {
                      return null;
                    }
                    return (
                      <p key={index + "time"} className="pr-3 sm:pr-8">
                        <span className="font-bold text-purple-600">Time:</span>{" "}
                        {item} min
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
  )
}
