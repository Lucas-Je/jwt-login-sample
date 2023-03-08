import './App.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {loginYup} from "./utils/yupSchema";
import {useLogin} from "./hooks/useReactQueryMutaion";
import {queryKey} from "./constnats/queryKey";
import Logger from "./utils/Logger";

function App() {
    const loginDefaultForm = {
        email: '',
        password: '',
    };
    const formOptions = { mode: 'onChange', defaultValues: loginDefaultForm, resolver: yupResolver(loginYup) };
    const { register, handleSubmit, watch, formState: { errors } } = useForm(formOptions);

    const { data, mutate: login, isLoading } = useLogin(queryKey.auth.login);
    const onSubmit = async formData => {
        Logger.log("onSubmit", formData)
        login(formData);
    };
    Logger.log("error", errors)
  return (
      <form style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} onSubmit={handleSubmit(onSubmit)}>
          <div style={{backgroundColor:'yellowgreen', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <div>email</div><input {...register('email')}/>
              <div>{errors.email?.message}</div>
          </div>
          <div style={{backgroundColor:'lightgoldenrodyellow', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <div>pw</div><input type={'password'} {...register('password')}/>
              {errors.password?.message}
          </div>
          <button type={"submit"}>LOGIN</button>
      </form>
  );
}

export default App;
