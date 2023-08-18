export default function getTopCitiesWithLargestPopulation(data){
  const citiesWithLargestPopulation = [];
  let count = 15

  data.forEach(entry => {
      if (entry.populationCounts.length > 0) {
          const latestPopulation = entry.populationCounts.reduce((max, count) => {
              const year = parseInt(count.year);
              if (year > max.year) {
                  return { year, value: parseFloat(count.value) };
              }
              return max;
          }, { year: 0, value: 0 });

          citiesWithLargestPopulation.push({
            country: entry.country,
              city: entry.city,
              population: latestPopulation.value,
              year: latestPopulation.year.toString()
          });
      }
  });

  citiesWithLargestPopulation.sort((a, b) => b.population - a.population);
  return citiesWithLargestPopulation.slice(0, count);
}