<?php 

namespace App\Services;

use App\Contracts\Repository\IJobTitleRepository;
use App\Contracts\Services\IJobTitleService;


class JobTitleService implements IJobTitleService{

      

      public function __construct(protected IJobTitleRepository $jobTitleRepo){}

      public function getJobTitleService(){
           
          return $data = $this->jobTitleRepo->getJobTitle();
           
      }
}