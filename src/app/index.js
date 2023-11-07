export const data = {
  paymentHistory: [],
  currentCars: {},
};

export const parkingIn = (
  entryId,
  parkingPlacesActually,
  currentTime = new Date()
) => {
  if (data.currentCars[entryId]) {
    console.log("There is already a car with the same ID");
    return;
  }

  if (Object.keys(data.currentCars).length >= parkingPlacesActually) {

    console.log("not places available");
    return
  }

  data.currentCars[entryId] = {
    timeIn: currentTime,
    day: currentTime.toLocaleDateString(),
  };
  console.log("Updated parkingLog:", data.currentCars);
  console.log(
    `places available  ${
      parkingPlacesActually - Object.keys(data.currentCars).length
    }`
  );
};

export const parkingOut = (
  entryId,
  parkingPlacesActually,
  priceDay,
  priceHour
) => {
  if (!data.currentCars[entryId]) {
    console.log(`the ${entryId} not find`);
    return;
  }
  const exitTime = new Date();
  const entry = data.currentCars[entryId].timeIn;

  const dayOfWeek = exitTime.toLocaleDateString("en-US", { weekday: "long" });

  if (entry) {
    const duration = (exitTime - entry) / (1000 * 60 * 60); // en hours

    const priceToPay = calculatPrice(duration, priceDay, priceHour);
    const payment = {
      dayOfWeek,
      entryId: entryId,
      entryTime: entry.timeIn,
      exitTime: exitTime,
      duration: Math.ceil(duration),
      totalPrice: priceToPay,
    };
    data.paymentHistory.push(payment);

    console.log(
      `Vehículo  ID ${entryId}  in date ${entry} out date ${exitTime.toLocaleTimeString()}. total hours ${Math.ceil(
        duration
      )} price: $${priceToPay}`
    );

    delete data.currentCars[entryId];
  } else {
    console.log("Not find ID .");
  }
};

const calculatPrice = (hours, priceDay, priceHour) => {
  if (hours < 1) {
    return priceHour;
  }
  if (hours > 24) {
    return (hours / 24) * priceDay;
  }
  if (priceHour * hours > priceDay) {
    return priceDay;
  } else {
    return priceHour * hours;
  }
};

export const putRandomCars = (parkingPlacesActually) => {
  for (let i = 100; i < 120; i++) {
    const randomDay = Math.floor(Math.random() * 27) + 1; // Números aleatorios de 1 a 31 (días válidos)
    const randomMonth = Math.floor(Math.random() * 10); // Números aleatorios de 0 a 12
    const randomHour = Math.floor(Math.random() * 24); // Números aleatorios de 0 a 23
    const randomMinute = Math.floor(Math.random() * 60); // Números aleatorios de 0 a 59

    // Formatea los valores aleatorios en una cadena de fecha
    const randomDate = `2023-${
      randomMonth + 1
    }-${randomDay} ${randomHour}:${randomMinute}`;

    const entryId = i; // Simplemente incrementa el ID en cada iteración
    parkingIn(entryId, parkingPlacesActually, new Date(randomDate));
  }
};

export const totalAveragePrices = (paymentHistory) => {
  const dayTotals = {};

  paymentHistory.forEach((payment) => {
    const { dayOfWeek, totalPrice } = payment;

    // Verificamos si ya existe una entrada para ese día en dayTotals
    if (!dayTotals[dayOfWeek]) {
      dayTotals[dayOfWeek] = {
        total: 0,
        count: 0,
      };
    }

    // Sumamos el totalPrice al total para ese día y aumentamos el contador
    dayTotals[dayOfWeek].total += totalPrice;
    dayTotals[dayOfWeek].count += 1;
  });

  // Calculamos el promedio para cada día y almacenamos los resultados en un objeto
  const averagePrices = {};
  for (const dayOfWeek in dayTotals) {
    const { total, count } = dayTotals[dayOfWeek];
    averagePrices[dayOfWeek] = total / count;
  }
  return averagePrices;
};
