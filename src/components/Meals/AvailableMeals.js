import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch"

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const {isLoading,error,RequestHandler : getMeal} = useFetch();

  useEffect(() => {
    const transformMeal = (data) => {
      const loadMeal = [];

      for (const key in data) {
        loadMeal.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price : data[key].price
        });
      }
      setMeals(loadMeal)
    };
    getMeal({
      url : "https://react-http-2e99e-default-rtdb.firebaseio.com/meals.json"
    },transformMeal)
    // console.log(meals);
  },[getMeal]);

  let content = "";

  if (isLoading) {
    content = 'Loading meals...';
  }

  if (error) {
    content = <button onClick={getMeal}>Try again</button>;;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  
  return (
    <section className={classes.meals}>
      <Card>
        {content ? <div className={classes.container}>{content}</div> : <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
