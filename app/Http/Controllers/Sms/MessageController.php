<?php

namespace App\Http\Controllers\Sms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Repositories\{ SenderRepository, MessageRepository, TransactionRepository, AccountRepository };
use App\Http\Requests\MessageRequest;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    /** @var MessageRepository */
    private $messageRepository;
    private $senderRepository;
    private $trxRepository;
    private $accountRepository;

    public function __construct(
        MessageRepository $messageRepository,
        SenderRepository $senderRepository,
        TransactionRepository $trxRepository,
        AccountRepository $accountRepository
    )
    {
        $this->messageRepository = $messageRepository;
        $this->senderRepository = $senderRepository;
        $this->trxRepository = $trxRepository;
        $this->accountRepository = $accountRepository;
    }

    public function index(Request $request, string $type): Response
    {
        $data = $this->senderRepository->all(['account_id' => $request->user()->account->id]);

        $balance = $this->senderRepository->find($request->user()->account->id)->account->sms;

        return Inertia::render('messages/page', [
            'senders' => $data,
            'balance' => $balance,
            'type' => $type,
        ]);
    }

    public function store(MessageRequest $request) {

        session()->forget(['error', 'success']);

        $sender = $this->senderRepository->all(['slug' => $request->sender_id])->first();

        if($request->total > $sender->account->sms) {
            return to_route('messages.index', ['type' => $request->type])->with('error', 'Solde sms insuffisant !');
        }

        $campaign = $this->messageRepository->create([
            'sender_id' => $sender->id,
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

        $account = $this->accountRepository->find($sender->account->id);
        $account->decrement('sms', $request->total);

        return to_route('messages.index', ['type' => $request->type])->with('success', 'Opération réussie !');

    }
}
