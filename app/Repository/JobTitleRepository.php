<?php

namespace App\Repository;

use App\Contracts\Repository\IJobTitleRepository;
use App\Models\JobTitle;

class JobTitleRepository implements IJobTitleRepository{

    public function getJobTitle(){
        
        return JobTitle::select('department','designation')->get();
    }

}