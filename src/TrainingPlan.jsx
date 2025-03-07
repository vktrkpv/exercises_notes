import { useState } from "react";

function TrainingPlan({ selectedDay, updateDay }) {
  const [newExercise, setNewExercise] = useState("");

  const editMyTrain = (myInput, value) => {
    updateDay({
      ...selectedDay,
      [myInput]: value,
    });
  };

  const addNewExercise = () => {
    if (newExercise.trim() === "") return;

    const updatedExercises = [
      ...selectedDay.exercises,
      { name: newExercise, completed: false },
    ];

    updateDay({
      ...selectedDay,
      exercises: updatedExercises,
    });

    setNewExercise("");
  };

  const toggleExercise = (index) => {
    const updatedExercises = selectedDay.exercises.map((exercise, i) =>
      i === index ? { ...exercise, completed: !exercise.completed } : exercise
    );

    updateDay({
      ...selectedDay,
      exercises: updatedExercises,
    });
  };

  if (!selectedDay || !selectedDay.exercises)
    return <p>Select a day to start editing your training!</p>;

  return (
    <section className="training-plan">
      <h2>Edit Training</h2>

      <label htmlFor="title">Title:</label>
      <input
        type="text"
        className="myInput"
        id="title"
        placeholder="Training title"
        value={selectedDay.title}
        onChange={(e) => editMyTrain("title", e.target.value)}
      />

      <h3>Exercises:</h3>

      <div className="add-exercise">
        <input
          type="text"
          className="myInput"
          placeholder="New exercise name"
          value={newExercise}
          onChange={(e) => setNewExercise(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addNewExercise();
            }
          }}
        />
        <button className="btn-add" onClick={addNewExercise}>
          Add Exercise
        </button>
      </div>

      <ul className="exercise-list">
        {selectedDay.exercises.map((exercise, index) => (
          <li key={index} className="exercise-item">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={exercise.completed}
                onChange={() => toggleExercise(index)}
              />
              <span className="checkmark"></span>
              <span className="exercise-name">{exercise.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TrainingPlan;
