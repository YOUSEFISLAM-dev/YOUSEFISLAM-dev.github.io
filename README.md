# Yousef Islam - Portfolio Website

This is a personal portfolio website for Yousef Islam, showcasing skills, projects, and professional certificates.

## Features

- Responsive design using Tailwind CSS
- Dark theme with gradient accents
- Dynamic certificates loaded from JSON data
- Sections for About, Skills, Certificates, Projects, and Contact

## How to Modify Certificate Data

The certificates are loaded dynamically from a JSON file. To add, remove, or modify certificates, edit the `/data/certificates.json` file:

```json
[
  {
    "id": 1,
    "title": "Certificate Title",
    "issuer": "Certificate Issuer",
    "issueDate": "Month Day, Year",
    "year": "YYYY",
    "imageUrl": "path/to/certificate/image.jpg",
    "verifyUrl": "https://verification/url"
  }
]
```

Each certificate object should include:
- `id`: A unique identifier
- `title`: The name of the certificate
- `issuer`: The organization that issued the certificate
- `issueDate`: The date when the certificate was issued
- `year`: The year when the certificate was issued (displayed in the badge)
- `imageUrl`: URL to the certificate image
- `verifyUrl`: URL where the certificate can be verified

## Development

This site uses:
- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- Font Awesome icons

## Deployment

The site is hosted on GitHub Pages and can be accessed at [https://yousefislam-dev.github.io](https://yousefislam-dev.github.io).