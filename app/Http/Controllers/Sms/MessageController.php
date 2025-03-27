<?php

namespace App\Http\Controllers\Sms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Repositories\{ SenderRepository, MessageRepository, TransactionRepository };
use App\Http\Requests\MessageRequest;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    /** @var MessageRepository */
    private $messageRepository;
    private $senderRepository;
    private $trxRepository;

    public function __construct(
        MessageRepository $messageRepository,
        SenderRepository $senderRepository,
        TransactionRepository $trxRepository
    )
    {
        $this->messageRepository = $messageRepository;
        $this->senderRepository = $senderRepository;
        $this->trxRepository = $trxRepository;
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

    public function store(MessageRequest $request): RedirectResponse {

        $campaign = $this->messageRepository->create([
            'sender_id' => $this->senderRepository->all(['slug' => $request->sender_id])->first()->id,
            'title' => $request->title,
            'message' => $request->message
        ]);

        foreach($request->phones as $phone) {

            if($phone) {
                $this->trxRepository->create([
                    'campaign_id' => $campaign->id,
                    'phone' => $phone,
                ]);
            }

        }

        return to_route('messages.index')->with('success', 'Opération réussie !');

    }
}
