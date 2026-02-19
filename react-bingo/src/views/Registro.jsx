import { useState } from "react";
import { useForm } from "react-hook-form"
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

    const [erroresBack, setErroresBack] = useState([]);

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting }
    } = useForm()

    const { registro } = useAuth({middleware:'guest', url:'/'})

    const password = watch("password")

    const onSubmit = (data) => {
      registro(data, setErroresBack);
    }

    return (
      <>
        <h1 className="text-3xl font-black mb-6">
          Crear cuenta
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        > 

          {erroresBack ? erroresBack.map((error,i) => <h1 className="text-red-600 text-xl" key={i}>{error}</h1>) : null}
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("name", {
                required: "El nombre es obligatorio"
              })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email no válido"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Mínimo 6 caracteres"
                }
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("password_confirmation", {
                required: "Confirma la contraseña",
                validate: value =>
                  value === password || "Las contraseñas no coinciden"
              })}
            />
            {errors.password_confirmation && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>

        </form>
      </>
    )

}
