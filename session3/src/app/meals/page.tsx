import MealGrid from "@/components/meals/mealGrid";
import { getAllMeals } from "@/db/dbService";
import Link from "next/link";
import classes from "./page.module.css";
import { Suspense } from "react";
import Loading from "./loading";

const MealsAsync = async () => {
  const meals = await getAllMeals();
  return <MealGrid meals={meals} />;
};

const Meals: React.FC = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Meals <span className={classes.highlight}> by you</span>
        </h1>
        <p>cook your fav receipe</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<Loading />}>
          <MealsAsync />
        </Suspense>
      </main>
    </>
  );
};

export default Meals;
