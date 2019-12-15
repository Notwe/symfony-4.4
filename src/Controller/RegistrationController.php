<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class RegistrationController extends AbstractController {
    /**
     * @Route("/sign-up", name="sign-up",  methods={"GET", "POST"})
     */
    public function register(
        Request $request,
        UserPasswordEncoderInterface $passwordEncoder
        ): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);
        if ($request->isXMLHttpRequest()) {
            if ($form->isSubmitted() && $form->isValid()) {
                $user->setPassword(
                    $passwordEncoder->encodePassword($user, $form->get('password')->getData()));

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($user);
                $entityManager->flush();


                return new JsonResponse(['status' => 'success']);
            }
            if ($form->isSubmitted() && !$form->isValid()) {
                $errors = [];
                foreach ($form->getErrors(true, true) as $formError) {
                    $errors[] = $formError->getMessage();
                }
                return new JsonResponse(['status' => 'error', 'data' => $errors]);
            }
        }

        return $this->render('register.html.twig', [
            'registrationForm' => $form->createView(), 'title'=>'Регистрация',
        ]);
    }
}
