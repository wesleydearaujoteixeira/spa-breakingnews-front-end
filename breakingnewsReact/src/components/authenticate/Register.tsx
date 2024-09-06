import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import styles from './loginStyle.module.css';
import { Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

const schema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    username: z.string().min(1, 'Nome de usuário é obrigatório'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    avatar: z.string().url('URL do avatar inválida'),
    background: z.string().url('URL do background inválida'),
});

type FormInputs = z.infer<typeof schema>;

export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const response = await axios.post('https://api-breakingnews-s97m.onrender.com/users/create', data); // Changed endpoint to /register
            alert(response.data.message);
            console.log('Resposta da API:', response.data.user);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro ao enviar dados:', error.response?.data);
                alert(`Erro ao enviar dados: ${error.response?.data.message}`);
            } else {
                console.error('Erro inesperado:', error);
                alert('Erro inesperado. Tente novamente.');
            }
        }
    };

    return (
        <main className={styles.appContent}>
            <div className={styles.btnComponentBack}>
                <Link to='/home'> <IoArrowBack /> </Link>
            </div>
            <h1> Register </h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.FormContent}>
                <label htmlFor="name">Nome:</label>
                <input
                    type="text"
                    id="name"
                    {...register('name')}
                />
                {errors.name && <p className={styles.error}> {errors.name.message} </p>}
                
                <label htmlFor="username">Nome de usuário:</label>
                <input
                    type="text"
                    id="username"
                    {...register('username')}
                />
                {errors.username && <p className={styles.error}> {errors.username.message} </p>}
                
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    {...register('email')}
                />
                {errors.email && <p className={styles.error}> {errors.email.message} </p>}
                
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    {...register('password')}
                />
                {errors.password && <p className={styles.error}> {errors.password.message} </p>}
                
                <label htmlFor="avatar">Avatar URL:</label>
                <input
                    type="text"
                    id="avatar"
                    {...register('avatar')}
                />
                {errors.avatar && <p className={styles.error}> {errors.avatar.message} </p>}
                
                <label htmlFor="background">Background URL:</label>
                <input
                    type="text"
                    id="background"
                    {...register('background')}
                />
                {errors.background && <p className={styles.error}> {errors.background.message} </p>}
                
                <button type="submit"> Enviar </button>
                
                <div className={styles.RegisterContent}>
                    <p> Já tem uma conta? </p>
                    <Link className={styles.regis} to="/login"> Faça login </Link>
                </div>
            </form>
        </main>
    );
}
