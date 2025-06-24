<?php 

namespace App\Services;

use App\Contracts\Repository\IJobTitleRepository;
use App\Contracts\Services\IJobTitleService;
use App\Repository\JobTitleRepository;

class JobTitleService implements IJobTitleService{

      private $jobTitleRepo;

      public function _construct(IJobTitleRepository $jobTitleRepo){
            $this->jobTitleRepo = $jobTitleRepo;
      }

      public function getJobTitleService(){
           
           $data = $this->jobTitleRepo->getJobTitle();
           return $data;
      }
}