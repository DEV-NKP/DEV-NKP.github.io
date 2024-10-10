const jsonLdData = [
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Niloy Kanti Paul",
        "jobTitle": "Software Developer",
        "url": "https://dev-nkp.github.io/",
        "sameAs": [
          "https://www.linkedin.com/in/niloykantipaul"
        ]
      }
];

// Create a script element to insert the JSON-LD data into the HTML
const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(jsonLdData);
document.head.appendChild(script);