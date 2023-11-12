// import TestComponent from "./components/TestComponent"


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full text-center items-center justify-center font-mono text-sm">
        <h1 className='text-4xl pb-5'>Workout App</h1>
        <p className='italic'>App to create and track your workouts for you.</p>
        <h2>In order to get started you must login.</h2>
        <p className='italic'>If you don&apos;t have an account you can create one.</p>
        <br></br>
        <p>How the app works:</p>
        <p>You can create a workout using the workout creator. You can then select that workout in the dashboard and it will prompt you thru the workout where you can complete your workout and change the weight/reps/time if you need to adjust your workout. At then end of the workout it will prompt you to save, which will display your current changes during your next workout.</p>
      </div>
      {/* <TestComponent /> */}
    </div>
  )
}
