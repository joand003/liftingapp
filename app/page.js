
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full text-center items-center justify-center font-mono text-sm">
        <h1 className='text-4xl pb-5'>Workout App</h1>
        <p className='italic'>App to create and track your workouts for you.</p>
        <h2>In order to get started you must login.</h2>
        <p className='italic'>If you don't have an account you can create one.</p>
        <p>How the app works:</p>
        <p>You can create a workout using the workout creator. You can then select that workout in the dashboard and it will prompt you thru the workout where you can record the weight/reps/sets/etc.</p>
        <p>You can then view your workout history in the dashboard as well.</p>
        <p>You can change your preferences in your profile.</p>
      </div>
    </div>
  )
}
