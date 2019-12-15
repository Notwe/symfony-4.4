<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class UserAuthorizeController extends AbstractController
{
    /**
     * @Route("/sign-in", name="sign-in")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
     if ($this->getUser()) {
        return $this->redirectToRoute('chat');
    }

        $error = $authenticationUtils->getLastAuthenticationError();

        return $this->render('login.html.twig', ['error' => $error, 'title' => 'Авторизация']);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \Exception('Аяяй, не дописал парвило в firewall, или ошибочка в коде , эта функция не должна отработать ... ');
    }
}
