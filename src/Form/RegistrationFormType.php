<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use \Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegistrationFormType extends AbstractType {
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
            ->add('name', TextType::class, [
                'required'    => false,
                'trim'        => true,
                'label'       => false,
                'attr'        => ['placeholder' => 'Имя'],
                'constraints' => [
                    new NotBlank(
                        ['message' => 'Имя не может быть пустым',]
                    ),
                    new Length([
                        'min' => 4,
                        'minMessage' => 'Длинная имени от {{ limit }} символов',
                        'max' => 16
                    ])
                ]
            ])

            ->add('password', RepeatedType::class, [
                'required'    => false,
                'trim'        => true,
                'mapped'      => false,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Пароль не может быть пустым',
                    ]),
                    new Length([
                        'min'        => 6,
                        'minMessage' => 'Длинна пароля должна быть не меньше {{ limit }} символов',
                        'max'        => 4000,
                    ]),
                ],
                'type' => PasswordType :: class ,
                'invalid_message' => 'Пароли должны совпадать' ,
                'options'         => [ 'attr' => [ 'class' => 'password-field' ],'label' => false,],
                'first_options'   => [ 'attr' => ['placeholder' => 'Пароль']],
                'second_options'  => [ 'attr' => ['placeholder' => 'Повторите пароль']],
            ])
            ->add('send',SubmitType::class, [
                'label' => 'ВХОД',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
