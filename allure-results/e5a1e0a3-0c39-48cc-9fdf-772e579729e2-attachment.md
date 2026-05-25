# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\bookstore.spec.ts >> DemoQA - Bookstore API >> POST - Tambah buku ke koleksi user
- Location: tests\api\bookstore.spec.ts:124:6

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 401
Received array: [201, 400]
```

# Test source

```ts
  55  |             userName: 'alokatest123',
  56  |             password: 'Test@12345'
  57  |         }
  58  |     });
  59  | 
  60  |     const body = await response.json();
  61  |     console.log('Status:', response.status());
  62  |     console.log('Response:', JSON.stringify(body));
  63  | 
  64  |     // 201 = user berhasil dibuat
  65  |     // 406 = username sudah ada
  66  |     expect([201, 406]).toContain(response.status());
  67  | });
  68  | 
  69  | test('POST - Token login user', async () => {
  70  |     const apiContext = await request.newContext();
  71  |     const response = await apiContext.post('https://demoqa.com/Account/v1/GenerateToken', {
  72  |         data: {
  73  |             userName: 'alokatest123',
  74  |             password: 'Test@12345'
  75  |         }
  76  |     });
  77  |     expect(response.status()).toBe(200);
  78  | 
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
  124 | test.only('POST - Tambah buku ke koleksi user', async () => {
  125 |     const apiContext = await request.newContext();
  126 | 
  127 |     
  128 |     const loginResponse = await apiContext.post('https://demoqa.com/Account/v1/GenerateToken', {
  129 |         data: {
  130 |             userName: 'alokatest123',
  131 |             password: 'Test@12345'
  132 |         }
  133 |     });
  134 | 
  135 |     const loginBody = await loginResponse.json();
  136 |     const token = loginBody.token;
  137 | 
  138 |     
  139 |     const response = await apiContext.post('https://demoqa.com/BookStore/v1/Books', {
  140 |         headers: {
  141 |             Authorization: `Bearer ${token}`
  142 |         },
  143 |         data: {
  144 |             userId: 'alokatest123',
  145 |             collectionOfIsbns: [
  146 |                 { isbn: '9781449325862' } 
  147 |             ]
  148 |         }
  149 |     });
  150 | 
  151 |     console.log('Status:', response.status());
  152 |     const body = await response.json();
  153 |     console.log('Response:', JSON.stringify(body));
  154 | 
> 155 |     expect([201, 400]).toContain(response.status());
      |                        ^ Error: expect(received).toContain(expected) // indexOf
  156 | });
  157 | 
  158 | 
  159 | });
```