# <u>PE-LAU-WETALK-FE (PORTAL DE ESTUDIANTE WETALK FRONT END)</u>

## Requisitos

Nodejs v16.19.1

```bash
node --version
#output v16.19.1
```

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

Pinia: due to an *ERESOLVE unable to resolve dependency tree* error, the following was added to the `package.json`:
```bash
"overrides": {
  "vue": "latest"
}
```

## Variables de entorno

### Development

```properties

CLIENTID=ef14064f-69bf-4ba5-8501-f8847ad654f9
AUTHORITY=https://login.microsoftonline.com/ae544a57-aecb-4bf9-828a-5b520732b110
REDIRECT_URI=https://portal-dev.wetalk.pe/callback/auth
POSTLOGOUT_REDIRECT_URI=https://portal-dev.wetalk.pe/callback/auth
NUXT_API_BASE=https://wetalkbe-dev-lau.stage01.link
NUXT_API_KEY=f5f7f62a-6e41-463e-8ce1-463cccd07848
NUXT_URL_TM=GTM-PF3RQPRR
```

### Stage

```properties
CLIENTID=
AUTHORITY=
REDIRECT_URI=
POSTLOGOUT_REDIRECT_URI=
NUXT_API_BASE=
NUXT_API_KEY=
NUXT_URL_TM=GTM-PF3RQPRR
```

### Production

```properties
CLIENTID=
AUTHORITY=
REDIRECT_URI=
POSTLOGOUT_REDIRECT_URI=
NUXT_API_BASE=
NUXT_API_KEY=
NUXT_URL_TM=GTM-PF3RQPRR
```

 

## Despliegue

### Objetos de despliegue 

|                                        | Develop                 | Stage                          | Production                    |
| -------------------------------------- | ----------------------- | ------------------------------ | ----------------------------- |
| S3                                     | s3-nombre               | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx | xxxxxxxxxxxxxxxxxxxx          |
| Cloud front                            | nombre cloudfront       | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx | xxxxxxxxxxxxxxx               |
| CNAME                                  | nombre                  | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx | xxxxxxxxxxxxxxxxxxxx          |
| dominio                                | nombre de dominio       | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx | xxxxxxxxxxxxxxxxxxxx          |
| Response headers - CloudFront-Policies | upc-portal-fe           | xxxxxxxxxxxxxxxxxxxxxxxxxxxxx  | xxxxxxxxxxxxxxxxxxxx          |

#### CloudFront /Policies/Response headers / Security headers 

##### Content-Security-Policy 

```yaml
- key: Content-Security-Policy
  value: 
    default-src 'self';
    img-src 'self' www.google.com.pe *.upc.edu.pe *.stage01.link *.wetalk.pe res.cloudinary.com *.chattigo.com;
    font-src 'self' data: *.chattigo.com *.mouseflow.com;
    frame-src *.youtube.com;
    media-src *.chattigo.com;
    connect-src 'self' stats.g.doubleclick.net *.upc.edu.pe *.stage01.link *.wetalk.pe *.chattigo.com wss://channels.chattigo.com *.googletagmanager.com *.mouseflow.com *.google-analytics.com analytics.google.com *.sentry.io *.ingest.sentry.io;
    style-src 'self' 'unsafe-inline' *.chattigo.com ;
    script-src 'self' 'unsafe-inline' *.chattigo.com *.googletagmanager.com *.mouseflow.com *.google-analytics.com  www.youtube.com;
```



### Comandos de despliegue 

```bash
#generar el fuente
npm install
npm run generate

#subir el fuente al s3
#DEV
#aws s3 cp .output/public/ s3://s3-upc-portal-fe-dev --recursive

#STAGE
aws s3 cp .output/public/ s3://s3-nombre --recursive
aws cloudfront create-invalidation --distribution-id id --paths "/*"

#PROD


```



## comando local

Start the development server on http://localhost:3000

```bash
npm run dev
```

