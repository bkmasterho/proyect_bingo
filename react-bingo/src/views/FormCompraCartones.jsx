import { useState } from "react";
import {
  useForm,
  FormProvider,
} from "react-hook-form";


import CompraCarton1 from '../views/stepsForm/CompraCarton1'
import CompraCarton2 from '../views/stepsForm/CompraCarton2'
import CompraCarton3 from '../views/stepsForm/CompraCarton3'

import { sendRequest } from '../helpers/bingoServices'

const steps = [
  { component: CompraCarton1 },
  { component: CompraCarton2 },
  { component: CompraCarton3 },
];

// Campos que se validan por paso
const stepFields = [
  ["nombre", "telefono", "cantidadCartones"], // Paso 1
  ["cartones"],                                // Paso 2
  //["metodo_pago"],                             // Paso 3
];

export default function MultiStepForm() {

  const [step, setStep] = useState(0);
  const [erroresBack, setErroresBack] = useState([]);
  const StepComponent = steps[step].component;

  const methods = useForm({
      shouldUnregister: false,
      defaultValues: {
        cantidadCartones: 1,
        nombre: "",
        telefono: "",
        cartones: [],
        metodo_pago: "",
      },
  })

  const { watch, getValues, trigger, clearErrors } = methods;

  const onSubmitStep = async () => {

      //VALIDACIÓN ESPECIAL PARA PASO 2

      if (step === 1) {
        const cantidadCartones = methods.getValues("cantidadCartones");
        const cartones = methods.getValues("cartones");

        methods.clearErrors("cartones"); // Limpio errores por si acaso.

        console.log("Los cartonessss",cartones)

        if (!cartones || cartones.length !== cantidadCartones) {
            methods.setError("cartones", {
              type: "manual",
              message: `Debes seleccionar exactamente ${cantidadCartones} cartón(es)`,
            });
            return;
        }
      }

      //Validacion normal por cada paso.

      const fieldsToValidate = stepFields[step] || [];
      const valid = fieldsToValidate.length === 0 ? true : await trigger(fieldsToValidate);

      if (!valid) return;

      if (step < steps.length - 1) {
        setStep(prev => prev + 1);
        return;
      }

      // Último paso → datos finales
      const camposForm = getValues();
      const losDatos = {
        ...getValues(),
        sorteo_id: 1,
        img_compra: 'comprobando',
        apellido:'jesus',
        email:'yisuin@gmail.com',
        cedula:'15856987'
      };

      console.log("Datos finales del formulario:", losDatos);


      //Envio mi peticion en la misma function de sendRequest ya valido errores:

      try {

        const data = await sendRequest({
          endpoint: '/api/compradores',
          data: losDatos,
          method: 'post'
        })

        console.log(data)

      } catch (error) {

        if (error.status === 422) {
          setErroresBack(error.errors)
        } else {
          console.error(error.message)
        }

      }
  
      alert("Formulario completado ✔");
      // Aquí podrías enviar los datos al backend
  };

  const handleBack = () => {
    methods.clearErrors();
    setStep(step - 1);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitStep)} className="pt-24">

        
        <StepComponent />

            <div className="flex max-w-2xl mx-auto mt-10">

                {step > 0 && (
                  <button 
                    className="w-50 py-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition cursor-pointer"
                    type="button" onClick={handleBack}>
                      Atrás
                  </button>
                )}

                <button 
                  type="submit" 
                  className="w-50 py-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition cursor-pointer ml-auto">
                  {step === steps.length - 1 ? "Finalizar" : "Siguiente"}
                </button>


            </div>

      </form>
    </FormProvider>
  );
}
