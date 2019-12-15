<?php


namespace App\Controller;


use App\Repository\MessagesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
/**
 * @Route("/chat")
 */
class ChatController  extends  AbstractController {
    /**
     * @Route("/", name="main_chat")
     */
    public function chat (MessagesRepository $messagesRepository) {

        return $this->render('temp.html.twig', [
            'title' =>'тест работает',
            'messages'=> $messagesRepository->findAll()
        ]);
    }


}