<?php

namespace App\Http\Controllers\Sms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\SenderRepository;
use App\Repositories\MessageRepository;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    /** @var MessageRepository */
    private $messageRepository;
    private $senderRepository;

    public function __construct(MessageRepository $messageRepository, SenderRepository $senderRepository)
    {
        $this->messageRepository = $messageRepository;
        $this->senderRepository = $senderRepository;
    }

    public function index(Request $request): Response
    {
        $data = $this->senderRepository->all(['account_id' => $request->user()->account->id]);

        $balance = $this->senderRepository->find($request->user()->account->id)->account->sms;

        return Inertia::render('messages/page', [
            'senders' => $data,
            'balance' => $balance
        ]);
    }
}
