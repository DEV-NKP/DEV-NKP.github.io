 // Function to get URL parameter and change the title
 function changeTitleBasedOnParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const titleParam = urlParams.get('video'); // Get the 'title' param from URL
   if(titleParam)
   {
    var pretitle="Niloy Kanti Paul | ";

    const projectDescriptions = {
      //SPI
      'spi': ['Student Progress Indicator (SPI)',
       'The Student Progress Indicator (SPI) is a C++-based console application designed to digitize student performance tracking in educational institutions. It allows Admins, Faculty, and Students to easily manage and access academic records, replacing traditional paper-based systems. SPI streamlines the process of adding, viewing, and managing student results with features like role-based access and a simple interface. Developed to enhance communication and efficiency, SPI supports the academic needs of millions of students in Bangladesh, offering a real-time solution for monitoring progress.',
        'Why This Project?',
         'The Student Progress Indicator (SPI) was developed to reduce paperwork and enhance the digital monitoring of student performance in educational institutions. This innovative solution addresses the critical need for real-time access to student evaluations.',
          'Which Techs Used?',
           'Built with C++ using the CodeBlocks IDE, SPI features a user-friendly console interface that supports three key roles: Admin, Faculty, and Student. This structure streamlines educational workflows and improves usability.',
            'Where It Impacts?',
             'SPI significantly impacts the education sector by enabling efficient tracking of student progress and fostering better communication between students and educators. This digital system is designed to support the academic journeys of approximately 19 million students in Bangladesh.',
              'W-WLPlPVl8s',
               'https://github.com/DEV-NKP/Student-Progress-Indicator-SPI'],
               //'param': ['video-title', 'video-description', 'video-q1', 'video-a1', 'video-q2', 'video-a2', 'video-q3', 'video-a3', 'video-frame(youtubecode)', 'video-redirect-url']

               //RAWV1.0
               'rawv1': ['RAW (Remotely Assistant Worker) V1.0', 'RAW is a Java-based program designed as a freelancing platform that connects buyers and sellers remotely. It facilitates job posting, bidding, and secure transactions between users. Built with Java and SQL Server, RAW’s initial release provides console-based interaction, allowing users to manage profiles, track tasks, and handle payments. Future versions aim to enhance features and user experience. Developed by Niloy Kanti Paul, Kaushik Biswas, and Dipanwita Saha, RAW addresses the growing need for freelance work, offering flexibility and opportunities for users to generate income.', 'Why This Project?', 'RAW was created to address the rising demand for freelancing platforms in today’s digital world. With increasing unemployment and the shift toward remote work, RAW aims to help individuals achieve better work-life balance while providing a platform for freelancers to earn a stable income.', 'Which Techs Used?', 'RAW is developed using Java and integrates with Microsoft SQL Server for database management. The system uses a console-based UI and is optimized for Windows platforms. Future updates will improve usability and introduce more features.', 'Where It Impacts?', 'RAW impacts the freelancing community by offering a platform that simplifies job searches, project management, and secure transactions. It enables both buyers and sellers to work flexibly, promoting remote work opportunities and empowering freelancers globally.', 'aObzrlNLhI0', 'https://github.com/DEV-NKP/Remotely-Assistant-Workers-RAW-V1.0.git'],
               
               //RAWV2.0
               'rawv2': ['Remotely Assistant Worker (RAW) V2.0', 'Remotely Assistant Workers (RAW) is a Java-based freelancing platform designed to combat unemployment by connecting buyers and sellers for remote work. Developed by Niloy Kanti Paul, Kaushik Biswas, and Dipanwita Saha, RAW provides a user-friendly interface for job postings, project management, and communication. The system is set for future enhancements to make freelancing easier and more efficient.', 'Why This Project?', 'Remotely Assistant Workers (RAW) was created to tackle the unemployment crisis by providing a reliable platform for freelancers and employers. It allows remote workers to find job opportunities and connects businesses with skilled professionals, enhancing job accessibility in a digital age.', 'Which Techs Used?', 'RAW is developed using Java and features a Graphical User Interface (GUI) for ease of interaction. It utilizes MySQL for the database, managed through XAMPP, and runs on Windows systems with JDK 8. Future versions will add more advanced features for buyers, sellers, and administrators.', 'Where It Impacts?', 'RAW has a direct impact on reducing unemployment by offering a platform for freelancers to find remote work. It helps businesses connect with global talent, providing mutual benefits and promoting a flexible, digital workforce.', 'AuJNB6E_LVY', 'https://github.com/DEV-NKP/Remotely-Assistant-Workers-RAW-V2.0.git'],
               
               'rawv3': ['Remotely Assistant Worker (RAW) V3.0', 'Remotely Assistant Workers (RAW) is a C#-based freelancing platform designed to address unemployment by connecting buyers and sellers for remote work. Developed by Niloy Kanti Paul, Kaushik Biswas, and Dipanwita Saha, RAW offers an intuitive interface for job postings, project management, and communication, streamlining the freelancing experience.', 'Why This Project?', 'The project aims to tackle the growing unemployment problem by providing a seamless platform for remote work. RAW bridges the gap between job seekers and employers, allowing users to find or post jobs easily, thus creating opportunities for freelancers and businesses.', 'Which Techs Used?', 'RAW is built using C# and Microsoft SQL Server, with a focus on user experience and scalability. It employs object-oriented programming (OOP) principles and follows modern software development methodologies to ensure a reliable and efficient platform for freelancing.', 'Where It Impacts?', 'RAW impacts the remote work ecosystem by offering a solution for both freelancers and employers, enhancing job accessibility and flexibility. By reducing the geographical limitations of traditional employment, RAW helps individuals find work from anywhere, contributing to the global freelancing market.', 'pC-buVJy-WQ', 'https://github.com/DEV-NKP/Remotely-Assistant-Workers-RAW-V3.0.git'],
               
               'foh': ['Fest Of Harmony (FOH)', 'Fest of Harmony (FOH) is a C++-based graphical system developed to showcase the charm of village fairs through a digital medium. Created by Niloy Kanti Paul, Kaushik Biswas, Dipanwita Saha, Niger Sultana Nishi, and Shamsunnahar Riya, FOH offers an immersive experience featuring natural elements and interactive games.', 'Why This Project?', 'FOH was designed to digitally capture the traditional essence of village fairs, providing users with an interactive, nature-based experience. The project aims to preserve cultural heritage through a modern graphical approach.', 'Which Techs Used?', 'FOH is built using C++ and utilizes graphical libraries to create a visually appealing and interactive system. It follows procedural programming and incorporates sound effects, animations, and user interaction controls.', 'Where It Impacts?', 'FOH impacts the realm of digital cultural preservation by offering a virtual representation of traditional village fairs, enriching users’ understanding of rural festivities and contributing to the preservation of cultural heritage in a tech-driven world.', 'b0pqrtICzf8', 'https://github.com/DEV-NKP/Fest-Of-Harmony-FOH.git'],
              
               'medicm': ['Medical Master (Medic-M)', 'Medic-M (Medical Master) is an online medicine delivery platform developed by Niloy Kanti Paul, Dipanwita Saha, and Kaushik Biswas using HTML, CSS, JavaScript, and PHP. The system enables customers to buy medicines online, allows sellers to manage their products, and provides administrators with tools to oversee user activity. Medic-M aims to improve the accessibility of essential medical supplies, offering a streamlined solution for the healthcare sector.', 'Why This Project?', 'The Medic-M (Medical Master) project was developed to streamline the process of purchasing and delivering medicines, making it easier for customers to access essential medications quickly, especially for those unable to visit pharmacies. This system addresses the lack of advanced digital solutions in the medical supply chain, ensuring medicine availability at hospitals and homes.', 'Which Techs Used?', 'Medic-M is built using HTML, CSS, JavaScript, and PHP, along with MySQL for the database. The project employs web development best practices, object-oriented programming, and data management techniques, providing a user-friendly interface for customers, sellers, and administrators.', 'Where It Impacts?', 'This project impacts the healthcare sector, helping individuals and hospitals easily purchase essential medical supplies online. It also benefits sellers by providing an organized platform for managing their inventory, while ensuring patients get the medications they need at their doorstep.', 'GeP8AP01ut8', 'https://github.com/DEV-NKP/Medic-Master-Medic-M.git'],
               
               'ideax': ['IDEA-X', 'IDEA-X is a C#-based social media platform, developed by Niloy Kanti Paul, Kaushik Biswas, Dipanwita Saha, and Anindra Das Bivas, designed for engineers to share innovative ideas. It allows users to post, track activities, and connect with others, while admins and UACs ensure a safe environment. IDEA-X fosters knowledge-sharing and collaboration among engineers, providing a unique platform for exchanging creative ideas.', 'Why This Project?', 'IDEA-X was created to address the need for engineers to share innovative ideas and connect with like-minded professionals. The platform enables idea-sharing in an interactive and engaging way, promoting knowledge exchange and collaboration among users.', 'Which Techs Used?', 'IDEA-X is built using C#, ASP.NET, and Microsoft SQL Server. The project employs an object-oriented approach, along with MVC architecture, ensuring a scalable, secure, and user-friendly experience.', 'Where It Impacts?', 'The project impacts the engineering community, providing a platform for knowledge-sharing, collaboration, and networking. It enhances communication, idea validation, and feedback among professionals, fostering innovation in the field.', 'GeP8AP01ut8', 'https://github.com/DEV-NKP/IDEA-X-V1.0.git'],
               
               'togo': ['Together Go (ToGo)', 'Together Go (ToGo) is a Java-based web application designed to streamline communication and task submissions between students and faculty. Developed by Niloy Kanti Paul, Kaushik Biswas, and Dipanwita Saha, ToGo simplifies class management, allowing faculty to create classrooms, assign tasks, and monitor submissions. The platform offers secure login for admins, faculty, and students, ensuring easy and efficient task submission and management.', 'Why This Project?', 'ToGo was created to simplify the task submission process for educational institutions, fostering better communication and time management between students and faculty.', 'Which Techs Used?', 'ToGo is developed using Java, MySQL Workbench, and IntelliJ IDEA. It incorporates object-oriented programming principles and a structured MVC design for better scalability and maintainability.', 'Where It Impacts?', 'The platform improves the efficiency of task submissions in educational settings, reducing administrative workload while enhancing student-faculty interactions.', 'GeP8AP01ut8', 'https://github.com/DEV-NKP/Together-Go-TOGO.git'],
               
               'toss': ['Traffic Operation Surveillance System (TOSS)', 'Traffic Operation Surveillance System (TOSS) is a cutting-edge web application developed by Niloy Kanti Paul, Dipanwita Saha, Kaushik Biswas, and Fahim Hasan Nilay. TOSS simplifies traffic violation management, allowing users to report violations, manage vehicle registrations, and access vital information seamlessly. This innovative solution promotes accountability and enhances road safety.', 'Why This Project?', 'TOSS addresses the growing challenges of traffic violation management in urban areas. With increasing vehicle numbers and limited traffic enforcement personnel, this system simplifies reporting violations, managing vehicle registrations, and ensuring accountability for traffic offenders, ultimately promoting road safety.', 'Which Techs Used?', 'TOSS is built using Node.js for backend development, combined with PostgreSQL for database management. The application employs a user-friendly web interface designed to enhance user experience and facilitate effective communication among various user roles, including Admin, Officers, Cops, and Vehicle Owners.', 'Where It Impacts?', 'TOSS significantly impacts traffic management by streamlining the process of reporting and managing violations. It fosters a safer driving environment, enables efficient law enforcement, and enhances accountability among vehicle owners and law enforcement agencies, making roads safer for everyone.', 'GeP8AP01ut8', 'https://github.com/DEV-NKP/TOSS-V1.0'],
              
               'metabin': ['Meta Bin', 'Meta Bin is an innovative Arduino-based smart device developed by Niloy Kanti Paul, Dipanwita Saha, Kaushik Biswas, Rifat Tasnia Islam, Samia Akter, and Most. Masnat Marufi. This cutting-edge project simplifies waste collection through gesture control, contributing to cleaner environments and more efficient waste management systems. With its user-friendly design and intelligent technology, Meta Bin represents a step forward in sustainable urban living.', 'Why This Project?', 'The Meta Bin project aims to tackle the growing global waste management crisis by introducing an innovative Arduino-based device that autonomously collects trash using human gestures. By simplifying waste collection, it promotes a cleaner environment and enhances the efficiency of existing waste management systems.', 'Which Techs Used?', 'Meta Bin leverages Arduino Mega as its core microcontroller, integrating IoT technology to streamline operations. The system utilizes sensors to detect trash and operates via gesture controls, making it user-friendly and efficient for public waste collection.', 'Where It Impacts?', 'Meta Bin significantly impacts urban waste management by facilitating easier trash collection in public areas. Its implementation can reduce the burden on waste collectors, improve sanitation, and encourage community participation in maintaining cleanliness in cities.', 'GeP8AP01ut8', 'https://github.com/DEV-NKP/META-BIN.git'],
             
  };



        const descriptions = projectDescriptions[titleParam];
        if (descriptions) {
          document.title = pretitle+descriptions[0]; 

          const videotitle = document.querySelector('.video-title');
          videotitle.textContent =descriptions[0];
          const videodescription = document.querySelector('.video-description');
          videodescription.textContent =descriptions[1];
          const videoq1 = document.querySelector('.video-q1');
          videoq1.textContent =descriptions[2];
          const videoa1 = document.querySelector('.video-a1');
          videoa1.textContent =descriptions[3];
          const videoq2 = document.querySelector('.video-q2');
          videoq2.textContent =descriptions[4];
          const videoa2 = document.querySelector('.video-a2');
          videoa2.textContent =descriptions[5];
          const videoq3 = document.querySelector('.video-q3');
          videoq3.textContent =descriptions[6];
          const videoa3 = document.querySelector('.video-a3');
          videoa3.textContent =descriptions[7];
          document.getElementById("video-frame").src = "https://www.youtube.com/embed/"+descriptions[8]+"?rel=1&enablejsapi=1&disablekb=1";
          const videoredirecturl = document.querySelector('.video-redirect-url');
          videoredirecturl.href =descriptions[9];

      } else {
          console.log('No matching descriptions found for the title');
          window.location.href="../";
      }
      
    }
    else{
      window.location.href="../";
    }
   
}

// Call the function when the page loads
window.onload = changeTitleBasedOnParam;


//afterload
document.addEventListener('readystatechange', event => { 

    if (event.target.readyState === "complete") {
      setTimeout(function() {
           document.getElementById("video-frame").contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
          }, 300);
          setTimeout(function() {
            document.getElementById("video-frame").contentWindow.postMessage('{"event":"command","func":"' + 'setVolume' + '","args":"10"}', '*');
          }, 500);
    }
});

// function playvideo(imgid, videoid){
    
//     document.getElementById(videoid).style.display="block";
//     document.getElementById(imgid).style.display="none";
 
//     document.getElementById(videoid).contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');

// }
    
    
//     function pausevideo(imgid, videoid){
      
//     document.getElementById(videoid).style.display="none";
//     document.getElementById(imgid).style.display="block";
    
//         document.getElementById(videoid).contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      
//     }

