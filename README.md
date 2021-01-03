### LenoOkta

Generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.29.

Practicing Okta SPA PKCE oAuth2 flow, following [Okta Angular Sample](https://github.com/okta/samples-js-angular/tree/master/okta-hosted-login).

### Notes from Okta sample

Tracing the requests in chrome developer console:

1. user lands on login page, click login

2. calls kota authorize GET: 

https://dev-9535874.okta.com/oauth2/default/v1/authorize

**client_id**: 0oa2tftujDqF9hQer5d6  
**code_challenge**: gsaqSYs3eap_wj3huwzxwfh1HXzH_wzZBvbe1wjN6PM  
**code_challenge_method**: S256  
**nonce**: UQOfnv8G7NOhknF5MXeBEkoGGQW8nDFtXwYfaFoCRLkLhk5KDBXSV9urGMzXCJaW  
**redirect_uri**: http://localhost:8080/login/callback  
**response_type**: code  
**state**: hcjK5GUoM55Tdor6HP5VwOFCCGes3ONbUwKoGldIx2q8qo6fp7qrbNY1ByLNB1s3  
**scope**: openid profile email  

okta login page displays

3. Submit login POST

https://dev-9535874.okta.com/api/v1/authn

payload of the POST:

password: "xxxxx"  
stateToken: "00g8oVECE7Rfx6F-o2TDV-MEYTF4EAjxt9sj83KE4Q"  
username: "xxxx@xxxx.com"  

response 200 cookie contains same stateToken

4. GET redirect to okta (request access code)
https://dev-9535874.okta.com/login/step-up/redirect

stateToken=00g8oVECE7Rfx6F-o2TDV-MEYTF4EAjxt9sj83KE4Q

response 302, location:

http://localhost:8080/login/callback?code=jRWhwHQ9IWdS3wq06YWcuue9fQfA5glYWyHLBfQPDCA&
state=hcjK5GUoM55Tdor6HP5VwOFCCGes3ONbUwKoGldIx2q8qo6fp7qrbNY1ByLNB1s3

code is authorization code

5a. OPTION to /oauth2/default/v1/token

5b. POST to okta, posting auth code in exchange for access token
https://dev-9535874.okta.com/oauth2/default/v1/token

client_id: 0oa2tftujDqF9hQer5d6  
redirect_uri: http://localhost:8080/login/callback  
grant_type: authorization_code  
code: jRWhwHQ9IWdS3wq06YWcuue9fQfA5glYWyHLBfQPDCA  
code_verifier: 2d771c42a9edb5912afea837beede0291f3689a167d  

response is the jwt  
{  
**"token_type"**:"Bearer",  
**"expires_in"**:3600,  
**"access_token"**:"eyJraWQiOiJWRU4xaDMxQU9fOFZzUXZLMzB5Njl3TXRDVUV3VkRUQTk4NzVkRzB5YWhnIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjhBREI2WHBlMVR5Ml9UVXVXRUdfQktQdGhBN2VMRUppMUFLNXMxU1NUbmMiLCJpc3MiOiJodHRwczovL2Rldi05NTM1ODc0Lm9rdGEuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiYXBpOi8vZGVmYXVsdCIsImlhdCI6MTYwODY3NTAyNywiZXhwIjoxNjA4Njc4NjI3LCJjaWQiOiIwb2EydGZ0dWpEcUY5aFFlcjVkNiIsInVpZCI6IjAwdTJ0ZTZzakpmdUI4eGc3NWQ2Iiwic2NwIjpbImVtYWlsIiwicHJvZmlsZSIsIm9wZW5pZCJdLCJzdWIiOiJyaWNoODhnb2xkbWFuQGdtYWlsLmNvbSJ9.oqxELY6_JUCPXJ_Nh2j_ZVgoSlJ6P0ERAWfkpG6chc1pmdE09yL5mzQbPc2ykP-VYse8VEVXVIX-HYeJODONQS3MsiB2kHIPiwdIUTcciuluMGTWcbuxqwcE7JaFBniX5fqKKtLVIl0qUGGTB0OBxX8-gdgBmLZiWpiP9SgMYOer0bOdGYU86AOsvlCqD1NeQXJ-zB5AEHT3MuTqRUoIfXLYW9eCmAdXHiAet_fQFGY1dLlZUxA07mzZCivZA5RyJf6Nc5cmob_hl8B0iTPnWDDVDQNjJG_fYApInsF9ePsHWuRBOHux0O265IW1tZjppQ2A-zF0vEMpmkCtXCh6bg",  
**"scope"**:"email profile openid",  
**"id_token"**:"eyJraWQiOiJWRU4xaDMxQU9fOFZzUXZLMzB5Njl3TXRDVUV3VkRUQTk4NzVkRzB5YWhnIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwMHUydGU2c2pKZnVCOHhnNzVkNiIsIm5hbWUiOiJSaWNoIEdvbGRtYW4iLCJlbWFpbCI6InJpY2g4OGdvbGRtYW5AZ21haWwuY29tIiwidmVyIjoxLCJpc3MiOiJodHRwczovL2Rldi05NTM1ODc0Lm9rdGEuY29tL29hdXRoMi9kZWZhdWx0IiwiYXVkIjoiMG9hMnRmdHVqRHFGOWhRZXI1ZDYiLCJpYXQiOjE2MDg2NzUwMjcsImV4cCI6MTYwODY3ODYyNywianRpIjoiSUQuQzNjckhNSC1pQnJWanNqazJkQ3ktMnFjbmt3Si0tZTBCNnByWFpNbmZlYyIsImFtciI6WyJwd2QiXSwiaWRwIjoiMDBvMnMzZWd2MjZsVHJoY1M1ZDYiLCJub25jZSI6IlVRT2ZudjhHN05PaGtuRjVNWGVCRWtvR0dRVzhuREZ0WHdZZmFGb0NSTGtMaGs1S0RCWFNWOXVyR016WENKYVciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyaWNoODhnb2xkbWFuQGdtYWlsLmNvbSIsImF1dGhfdGltZSI6MTYwODY3NTAyNSwiYXRfaGFzaCI6IlRyeHh0d1pIdk5OR1R2bGtaZUJlWHcifQ.N5oZBaFuRL7Rd-JQDzhz_PSrWi_22lO57zgbvxubEvylMhzFOq9MFvToyld_zKWtPddOJS-g6j8LcB1WxdFuqq3mAwTfUyCLI9L2fSq9wdXzlEnsbGGGGDIBeoyuaSrcVvFPIXXV0OLSYu7WBgED1vhpiX1KV39Cdz4VhV-uDB_617-uWFSxM3kQru-fDLGYtI5YEE2b3AuDBcUwsoIG_qdhbro4lgKalDygCHt9Oh9SR-UPAkxM2AVIAt9SOau6vCvV67rktoZUBliFtn5BF93iA35i8L-siUbxgCNtCSB6rR-ZhBGgzrqc28zY1tOm1lRwpB5cWQ_NvhUKmZJnaQ"  
}

6. home page checks access_token, isAuthenticated=true, calls for user details
https://dev-9535874.okta.com/oauth2/default/v1/userinfo

request header:  
authorization: Bearer "eyJra...tXCh6bg"

