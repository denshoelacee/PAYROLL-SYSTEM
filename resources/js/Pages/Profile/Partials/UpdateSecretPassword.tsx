import { useRef, FormEventHandler, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Dropdown from '@/Components/Dropdown';
import { RiArrowDropDownLine } from 'react-icons/ri';
useState

export default function UpdateSecretPassword({ className = '' }: { className?: string }) {
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const [selectQuestion, setSelectQuestion] = useState('Select Question');
    
    const options = [
     'What is the name of your first pet?',
     'What was the name of your elementary school?',
     'In what city were you born?',
     'What is your mother’s maiden name?',
     'What was your childhood nickname?',
     'What was the make and model of your first car?',
     'What is the name of the street you grew up on?',
     'What is your favorite teacher’s name from high school?',
     'What is the name of your favorite childhood friend?',
     'What was the name of your first employer or job?'
    ];
    
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        secret_answer: '',
        secret_question: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('user.updatesecretanswer'), {
            preserveScroll: true,
            onSuccess: () =>{
                reset(),
                setSelectQuestion('Select Question')
            },
            onError: (errors) => {
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    const handleDropdownSelect = (value: any, field: string) => {
       if (field === 'secret_question'){
            setSelectQuestion(value)
            setData('secret_question', value); 
        }
    };

    console.log(data.secret_question)
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">Update Secret Passwords</h2>

                <p className="mt-1 text-sm text-white">
                    For security purposes, do not forget your Secret Answer and Secret Password.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" value="Current Password" className="text-white"/>

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className=" block w-full bg-transparent text-white"
                        autoComplete="current-password"
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="secret_question" value="Secret Question *" className='text-white' />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="w-full border border-button-border-color rounded-lg py-1.5 px-3 flex justify-between items-center md:w-full text-white">
                                    <p className='text-sm'>{selectQuestion}</p>
                                    <RiArrowDropDownLine className={`text-2xl transition-transform duration-500 ease-in-out`}/>
                                </button>
                            </Dropdown.Trigger> 
                            <Dropdown.Content contentClasses="w-full h-[200px] overflow-auto" align="left" >
                                {options.map((option, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    id='secret_question'
                                    name='secret_question'
                                    onClick={() => {
                                    handleDropdownSelect(option, 'secret_question');
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-white text-white hover:text-black"
                                >
                                    {option}
                                </button>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                            
                    <InputError message={errors.secret_question} className="mt-1" />
                </div>
                <div>
                    <InputLabel htmlFor="secret_answer" value="Secret Answer *" className='text-white' />
                        <div className=" rounded-xl">
                            <TextInput
                                id="secret_answer"
                                name="secret_answer"
                                value={data.secret_answer}
                                className="block bg-transparent w-full text-white"
                                onChange={(e) => setData('secret_answer', e.target.value)}
                            />
                        </div>
                    <InputError message={errors.secret_answer} className="mt-1" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
