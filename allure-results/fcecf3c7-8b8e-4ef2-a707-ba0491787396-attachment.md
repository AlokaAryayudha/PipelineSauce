# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\bookstore.spec.ts >> DemoQA - Bookstore API >> DELETE - Hapus buku dari koleksi user yang sudah ada
- Location: tests\api\bookstore.spec.ts:172:5

# Error details

```
Error: apiRequestContext.post: read ECONNRESET
Call log:
  - → POST https://demoqa.com/Account/v1/User
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.7778.96 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - content-type: application/json
    - content-length: 57

```

# Test source

```ts
  79  |     const body = await response.json();
  80  |     console.log('Token:', body.token);
  81  |     console.log('Status:', body.status);
  82  | 
  83  |     expect(body.status).toBe('Success');
  84  |     expect(body.token).not.toBeNull();
  85  |     
  86  | });
  87  | 
  88  | test('DELETE - Hapus buku dari koleksi user', async () => {
  89  |     const apiContext = await request.newContext();
  90  |     const loginResponse = await apiContext.post('https://demoqa.com/Account/v1/GenerateToken', {
  91  |         data: {
  92  |             userName: 'alokatest123',
  93  |             password: 'Test@12345'
  94  |         }
  95  |     });
  96  |     const loginBody = await loginResponse.json();
  97  |     const token = loginBody.token;
  98  |     console.log('Token:', token);
  99  | 
  100 |     const userResponse = await apiContext.get('https://demoqa.com/Account/v1/Authorized', {
  101 |         headers: {
  102 |             Authorization: `Bearer ${token}`
  103 |         },
  104 |         data: {
  105 |             userName: 'alokatest123',
  106 |             password: 'Test@12345'
  107 |         }
  108 |     })
  109 | 
  110 |     console.log('Authorized Status:', userResponse.status());
  111 |     expect(userResponse.status()).toBe(200);
  112 | 
  113 |     const deleteResponse = await apiContext.delete(
  114 |         'https://demoqa.com/BookStore/v1/Books?UserId=alokatest123', {
  115 |         headers: {
  116 |             Authorization: `Bearer ${token}`
  117 |         }
  118 |     });
  119 | 
  120 |     console.log('Delete status:', deleteResponse.status());
  121 |     expect([204, 401]).toContain(deleteResponse.status());
  122 | });
  123 | 
  124 | test('POST - Tambah buku ke koleksi user', async () => {
  125 |     const apiContext = await request.newContext();
  126 | 
  127 |     // Username unik
  128 |     const userName = `aloka${Date.now()}`;
  129 | 
  130 |     // Register 
  131 |     const registerResponse = await apiContext.post('https://demoqa.com/Account/v1/User', {
  132 |         data: {
  133 |             userName: userName,
  134 |             password: 'Test@12345'
  135 |         }
  136 |     });
  137 |     const registerBody = await registerResponse.json();
  138 |     console.log('Register:', JSON.stringify(registerBody));
  139 |     const userId = registerBody.userID;
  140 |     console.log('UserId:', userId);
  141 | 
  142 |     // Login ambil token
  143 |     const loginResponse = await apiContext.post('https://demoqa.com/Account/v1/GenerateToken', {
  144 |         data: {
  145 |             userName: userName,
  146 |             password: 'Test@12345'
  147 |         }
  148 |     });
  149 |     const token = (await loginResponse.json()).token;
  150 |     console.log('Token:', token);
  151 | 
  152 |     // Tambah buku ke koleksi user
  153 |     const response = await apiContext.post('https://demoqa.com/BookStore/v1/Books', {
  154 |         headers: { 
  155 |             Authorization: `Bearer ${token}` 
  156 |         },
  157 |         data: {
  158 |             userId: userId,
  159 |             collectionOfIsbns: [
  160 |                 { isbn: '9781449325862' } // Git Pocket Guide
  161 |             ]
  162 |         }
  163 |     });
  164 | 
  165 |     expect(response.status()).toBe(201);
  166 |     
  167 |     const body = await response.json();
  168 |     console.log('Response:', JSON.stringify(body));
  169 |     console.log('Buku ditambahkan:', body.books[0].title);
  170 | });
  171 | 
  172 | test('DELETE - Hapus buku dari koleksi user yang sudah ada', async () => {
  173 |     const apiContext = await request.newContext();
  174 | 
  175 |     // Buat username unik
  176 |     const userName = `aloka${Date.now()}`;
  177 | 
  178 |     // Register
> 179 |     const registerResponse = await apiContext.post('https://demoqa.com/Account/v1/User', {
      |                                               ^ Error: apiRequestContext.post: read ECONNRESET
  180 |         data: { userName, password: 'Test@12345' }
  181 |     });
  182 |     const userId = (await registerResponse.json()).userID;
  183 | 
  184 |     // Login ambil token
  185 |     const loginResponse = await apiContext.post('https://demoqa.com/Account/v1/GenerateToken', {
  186 |         data: { userName, password: 'Test@12345' }
  187 |     });
  188 |     const token = (await loginResponse.json()).token;
  189 | 
  190 |     // Tambah buku dulu sebelum dihapus
  191 |     await apiContext.post('https://demoqa.com/BookStore/v1/Books', {
  192 |         headers: { Authorization: `Bearer ${token}` },
  193 |         data: {
  194 |             userId,
  195 |             collectionOfIsbns: [{ isbn: '9781449325862' }]
  196 |         }
  197 |     });
  198 | 
  199 |     // Hapus buku
  200 |     const deleteResponse = await apiContext.delete('https://demoqa.com/BookStore/v1/Book', {
  201 |         headers: { Authorization: `Bearer ${token}` },
  202 |         data: {
  203 |             isbn: '9781449325862',
  204 |             userId
  205 |         }
  206 |     });
  207 | 
  208 |     console.log('Delete status:', deleteResponse.status());
  209 |     expect(deleteResponse.status()).toBe(204);
  210 | });
  211 | 
  212 | 
  213 | });
```