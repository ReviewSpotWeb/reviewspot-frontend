import RegisterForm from "./register-form";
const Register = () => {
  return (
    <div className="w-full h-max">
      <div className="bg-[#444] rounded p-2 flex flex-col gap-2 justify-center items-center">
        <RegisterForm />
      </div>
    </div>
  );
};
export default Register;
