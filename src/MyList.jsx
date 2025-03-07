function MyList({
  addexercise,
  trainingPlan,
  deleteTraining,
  selectedDay,
  setSelectedDay,
}) {
  return (
    <section>
      <div>
        <div>
          <h1>Weekely Training Plan</h1>
          <button className="btn-add" onClick={addexercise}>
            Add
          </button>
        </div>
        <div>
          {trainingPlan.map(({ id, title}) => (
            <div
            key={id}
              className={`train ${
                id === selectedDay ? "selected" : "default"
              } padding `}
              onClick={() => setSelectedDay(id)}
            >
              <p>{title}</p>
              <button className="btn-delete" onClick={() => deleteTraining(id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyList;
