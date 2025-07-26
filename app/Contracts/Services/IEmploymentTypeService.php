<?php

namespace App\Contracts\Services;

interface IEmploymentTypeService
{

    public function list();
    public function create(array $data);

    public function update(int $id, array $data);

    public function delete(int $id);
}