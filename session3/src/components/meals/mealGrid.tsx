import React, { FC } from "react";
import classes from "./meals.module.css";
import { MealItemType } from "@/types";
import MealItem from "./mealItem";

type Props = {
  meals: MealItemType[];
};

const MealGrid: FC<Props> = ({ meals }) => {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};

export default MealGrid;
