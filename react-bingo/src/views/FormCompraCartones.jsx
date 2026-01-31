

import { useState } from "react";
import {
  useForm,
  FormProvider,
} from "react-hook-form";

import CompraCarton1 from '../views/stepsForm/CompraCarton1'
import CompraCarton2 from '../views/stepsForm/CompraCarton2'
import CompraCarton3 from '../views/stepsForm/CompraCarton3'

const steps = [
  { component: CompraCarton1 },
  { component: CompraCarton2 },
  { component: CompraCarton3 },
];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);


  const StepComponent = steps[step].component;

  const methods = useForm()

  const onSubmitStep = async () => {
    const valid = await methods.trigger();
    if (!valid) return;

    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }

    const data = methods.getValues();
    console.log("Datos finales:", data);
    alert("Formulario completado ✔");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitStep)} className="pt-24">

        
        <StepComponent />

            <div className="flex max-w-2xl mx-auto mt-10">

                {step > 0 && (
                  <button 
                    className="w-50 py-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition cursor-pointer"
                    type="button" onClick={() => setStep(step - 1)}>
                      Atrás
                  </button>
                )}

                <button type="submit" 
                  className="w-50 py-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition cursor-pointer ml-auto">
                  {step === steps.length - 1 ? "Finalizar" : "Siguiente"}
                </button>


            </div>

      </form>
    </FormProvider>
  );
}
