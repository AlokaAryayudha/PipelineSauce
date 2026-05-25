import { test, expect, request } from '@playwright/test';

test.describe('DemoQA - Bookstore API', () => {

  test('GET - Verifikasi struktur semua field buku', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://demoqa.com/BookStore/v1/Books');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    const firstBook = body.books[0];

    // Verifikasi semua field ada
    expect(firstBook).toHaveProperty('isbn');
    expect(firstBook).toHaveProperty('title');
    expect(firstBook).toHaveProperty('subTitle');
    expect(firstBook).toHaveProperty('author');
    expect(firstBook).toHaveProperty('publisher');
    expect(firstBook).toHaveProperty('pages');
    expect(firstBook).toHaveProperty('description');
    expect(firstBook).toHaveProperty('website');

    console.log('ISBN:', firstBook.isbn);
    console.log('Judul:', firstBook.title);
    console.log('Author:', firstBook.author);
    console.log('Publisher:', firstBook.publisher);
    console.log('Halaman:', firstBook.pages);
});

test('GET - Detail satu buku by ISBN', async () => {
    const apiContext = await request.newContext();
    
    const isbn = '9781449325862'; // Git Pocket Guide
    
    const response = await apiContext.get(
        `https://demoqa.com/BookStore/v1/Book?ISBN=${isbn}`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Judul:', body.title);
    console.log('Author:', body.author);

    expect(body.isbn).toBe(isbn);
    expect(body.title).toBe('Git Pocket Guide');
});

test('POST - Buat user baru', async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.post('https://demoqa.com/Account/v1/User', {
        data: {
            userName: 'alokatest123',
            password: 'Test@12345'
        }
    });

    const body = await response.json();
    console.log('Status:', response.status());
    console.log('Response:', JSON.stringify(body));

    // 201 = user berhasil dibuat
    // 406 = username sudah ada
    expect([201, 406]).toContain(response.status());
});

test('POST - Token login user', async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.post('https://demoqa.com/Account/v1/GenerateToken', {
        data: {
            userName: 'alokatest123',
            password: 'Test@12345'
        }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Token:', body.token);
    console.log('Status:', body.status);

    expect(body.status).toBe('Success');
    expect(body.token).not.toBeNull();
    
});

test('DELETE - Hapus buku dari koleksi user', async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://demoqa.com/Account/v1/GenerateToken', {
        data: {
            userName: 'alokatest123',
            password: 'Test@12345'
        }
    });
    const loginBody = await loginResponse.json();
    const token = loginBody.token;
    console.log('Token:', token);

    const userResponse = await apiContext.get('https://demoqa.com/Account/v1/Authorized', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            userName: 'alokatest123',
            password: 'Test@12345'
        }
    })

    console.log('Authorized Status:', userResponse.status());
    expect(userResponse.status()).toBe(200);

    const deleteResponse = await apiContext.delete(
        'https://demoqa.com/BookStore/v1/Books?UserId=alokatest123', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log('Delete status:', deleteResponse.status());
    expect([204, 401]).toContain(deleteResponse.status());
});

test('POST - Tambah buku ke koleksi user', async () => {
    const apiContext = await request.newContext();

    // Username unik
    const userName = `aloka${Date.now()}`;

    // Register 
    const registerResponse = await apiContext.post('https://demoqa.com/Account/v1/User', {
        data: {
            userName: userName,
            password: 'Test@12345'
        }
    });
    const registerBody = await registerResponse.json();
    console.log('Register:', JSON.stringify(registerBody));
    const userId = registerBody.userID;
    console.log('UserId:', userId);

    // Login ambil token
    const loginResponse = await apiContext.post('https://demoqa.com/Account/v1/GenerateToken', {
        data: {
            userName: userName,
            password: 'Test@12345'
        }
    });
    const token = (await loginResponse.json()).token;
    console.log('Token:', token);

    // Tambah buku ke koleksi user
    const response = await apiContext.post('https://demoqa.com/BookStore/v1/Books', {
        headers: { 
            Authorization: `Bearer ${token}` 
        },
        data: {
            userId: userId,
            collectionOfIsbns: [
                { isbn: '9781449325862' } // Git Pocket Guide
            ]
        }
    });

    expect(response.status()).toBe(201);
    
    const body = await response.json();
    console.log('Response:', JSON.stringify(body));
    console.log('Buku ditambahkan:', body.books[0].title);
});

test('DELETE - Hapus buku dari koleksi user yang sudah ada', async () => {
    const apiContext = await request.newContext();

    // Buat username unik
    const userName = `aloka${Date.now()}`;

    // Register
    const registerResponse = await apiContext.post('https://demoqa.com/Account/v1/User', {
        data: { userName, password: 'Test@12345' }
    });
    const userId = (await registerResponse.json()).userID;

    // Login ambil token
    const loginResponse = await apiContext.post('https://demoqa.com/Account/v1/GenerateToken', {
        data: { userName, password: 'Test@12345' }
    });
    const token = (await loginResponse.json()).token;

    // Tambah buku dulu sebelum dihapus
    await apiContext.post('https://demoqa.com/BookStore/v1/Books', {
        headers: { Authorization: `Bearer ${token}` },
        data: {
            userId,
            collectionOfIsbns: [{ isbn: '9781449325862' }]
        }
    });

    // Hapus buku
    const deleteResponse = await apiContext.delete('https://demoqa.com/BookStore/v1/Book', {
        headers: { Authorization: `Bearer ${token}` },
        data: {
            isbn: '9781449325862',
            userId
        }
    });

    console.log('Delete status:', deleteResponse.status());
    expect(deleteResponse.status()).toBe(204);
});


});