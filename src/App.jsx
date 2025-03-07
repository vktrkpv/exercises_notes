import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import MyList from "./MyList";
import TrainingPlan from "./TrainingPlan";

function App() {
  const [trainingPlan, setTrainingPlan] = useState(
    localStorage.trainingPlan ? JSON.parse(localStorage.trainingPlan) : []
  );
  const [selectedDay, setSelectedDay] = useState(false);

  useEffect(() => {
    localStorage.setItem("trainingPlan", JSON.stringify(trainingPlan));
  }, [trainingPlan]);

  const addExercise = () => {
    const newExercise = {
      title: "Training plan for ",
      id: uuidv4(),
      exercises: [],
    };
    setTrainingPlan([newExercise, ...trainingPlan]);
  };

  const deleteTraining = (trainId) => {
    setTrainingPlan(trainingPlan.filter(({ id }) => id !== trainId));
  };

  const updateDay = (myUpdatedTraining) => {
    const updatedTraining = trainingPlan.map((trainPlan) => {
      if (trainPlan.id === myUpdatedTraining.id) {
        return myUpdatedTraining;
      }
      return trainPlan;
    });
    setTrainingPlan(updatedTraining);
  };

  const getActiveTraining = () => {
    return trainingPlan.find(({ id }) => id === selectedDay);
  };

  return (
    <div className="container">
      <MyList
        addexercise={addExercise}
        trainingPlan={trainingPlan}
        deleteTraining={deleteTraining}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <TrainingPlan selectedDay={getActiveTraining()} updateDay={updateDay} />
    </div>
  );
}

export default App;
