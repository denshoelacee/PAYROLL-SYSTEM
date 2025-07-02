import React, { useEffect } from 'react';
import { sha256 } from 'js-sha256';
import { usePage } from '@inertiajs/react';
import denshodeveloper from '/resources/images/chatgepetee.png';
import tayonsdeveloper from '/resources/images/tayons.png';
import laniedeveloper from '/resources/images/lanie.png';
import { FaFacebook,FaLinkedin} from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  email?: string;
  github?: string;
}

interface TeamProps {
  dev: {
    team_name: string;
    members: TeamMember[];
  };
   team_hash: string;
}
export function Developers() {
   const { dev, team_hash } = usePage().props as TeamProps;

  useEffect(() => {
    const localHash = sha256(JSON.stringify(dev.members));
    if (localHash !== team_hash) {
      console.warn('⚠️ Developer info may have been tampered with or hardcoded.');
    }
  }, [dev, team_hash]);

  return (
    <div className='flex flex-col md:flex-row justify-evenly items-center gap-10 py-12'>
      {dev.members.map((member, index) => {
        const image = [denshodeveloper, tayonsdeveloper ,laniedeveloper,][index];

        return (
          <div key={index} className='relative group w-[260px] h-[300px]'>
            <img
              src={image}
              alt={member.name}
              className="w-full h-full grayscale group-hover:grayscale-0 transition duration-500"
            />
            <div className="w-full opacity-0 group-hover:opacity-100 transition duration-500 absolute top-52 h-24 text-center bg-[#16423C] z-10 text-white">
              <p className="pt-2">{member.name}</p>
              <p>{member.role}</p>
              <div className='flex justify-center gap-3 py-1'>
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className='text-2xl' color="#1877F2" />
                  </a>
                )}
                <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer">
                  <FaFacebook className='text-2xl' color="#1877F2" />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}