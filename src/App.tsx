function App() {
  const days = [
    {
      date: "2 Oct",
      special: "Gandhi Jayanthi",
    },
    {
      date: "15 Aug",
      special: "Independence Day",
    },
  ];

  return (
    <div className="paper container container-md margin-top-large">
      <h1 className="text-center">Public Holidays App</h1>

      <div className="form-group margin-bottom-large">
        <label htmlFor="countrySelect">Select Country</label>
        <select id="countrySelect">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </div>

      <ul>
        {days.map((day, index) => (
          <li className="margin-bottom-small" key={index}>
            {day.date} {day.special}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
