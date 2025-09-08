<?php

namespace App\Contracts\Services\Auth;

interface SecretQAServiceInterface
{

    public function create(array $data);

    public function update(int $id, array $data);

    
}