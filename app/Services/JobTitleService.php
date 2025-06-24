<?php 

namespace App\Services;

use App\Contracts\Repository\IJobTitleRepository;
use App\Contracts\Services\IJobTitleService;


class JobTitleService implements IJobTitleService{

      private $jobTitleRepo;

      public function __construct(IJobTitleRepository $jobTitleRepo){
            $this->jobTitleRepo = $jobTitleRepo;
      }

      public function getJobTitleService(){
           
          return $data = $this->jobTitleRepo->getJobTitle();
           
      }
}