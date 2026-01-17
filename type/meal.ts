export type MealCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strArea: string;
  strTags: string | null;
  [key: string]: string | null;
};
