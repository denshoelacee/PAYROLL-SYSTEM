<?php

namespace App\Services\Auth;

use App\Contracts\Repository\SecretQuestionRepositoryInterface;
use App\Contracts\Services\Auth\SecretQAServiceInterface;
use Illuminate\Support\Facades\Auth;


class SecretQAService
{

    public function __construct(protected SecretQuestionRepositoryInterface $secretQARepository){}

    public function create(array $data)
    {

        if(!Auth::check()){

            return Redirect()->route('login');

        }

       return $this->secretQARepository->create($data);

    }

    public function update(int $id, array $data)
    {

        return $this->secretQARepository->update($id,$data);

    }

}