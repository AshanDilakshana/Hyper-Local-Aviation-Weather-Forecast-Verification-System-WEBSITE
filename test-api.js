fetch("http://localhost:5173/api/weather/taf?ids=VCBI&format=json")
  .then(res => res.json())
  .then(data => {
    if(!Array.isArray(data)) {
      console.log("Not an array:", data);
      process.exit(1);
    }
    console.log("Success, array length:", data.length);
  })
  .catch(err => {
    console.error("Fetch error:", err);
  });
