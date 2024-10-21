/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface fromConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface Iprops extends fromConfig {
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>;
}

export default function FXForm({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: Iprops) {
  const formConfig: fromConfig = {};

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  //The !! (double exclamation mark) is a JavaScript trick to convert a value into a boolean. It ensures that the value is either true or false.  it is used to check whether defaultValues and resolver are provided, and if so, add them to the formConfig object. !!defaultValues ensures that if defaultValues is undefined or null, it doesn't add undefined or null to formConfig. Only truthy values (objects in this case) are added.
  if (!!resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);
  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
