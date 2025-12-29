# 👑 LinkedIn Queens Solver

LinkedIn Queens oyununu otomatik olarak çözen Chrome extension.

## 🎯 Özellikler

- ✅ **Otomatik Çözüm**: Bir tıkla tüm oyunu otomatik çöz
- 👁️ **Görsel İpuçları**: Hangi hücrelere vezir yerleştireceğini göster
- ⚡ **Hızlı ve Doğru**: Backtracking algoritması ile hızlı çözüm
- 🎨 **Modern Arayüz**: Kullanıcı dostu ve güzel tasarım
- 🔄 **Otomatik Algılama**: LinkedIn'de oyunu otomatik olarak algılar

## 📦 Kurulum

### Chrome/Edge'e Yükleme

1. Bu klasörün konumunu not al: `/Users/alameddincelik/Projects/queuesolver/linkedin-queens-solver`

2. Chrome'u aç ve adres çubuğuna yaz:
   ```
   chrome://extensions/
   ```

3. Sağ üstten **"Geliştirici modu"** (Developer mode) açık olduğundan emin ol

4. **"Paketlenmemiş uzantı yükle"** (Load unpacked) butonuna tıkla

5. Şu klasörü seç:
   ```
   /Users/alameddincelik/Projects/queuesolver/linkedin-queens-solver
   ```

6. Uzantı yüklendi! 🎉

### İkon Oluşturma (Opsiyonel)

İkonlar şu an eksik. İsterseniz şu adımları izleyerek ekleyebilirsiniz:

1. 16x16, 48x48 ve 128x128 boyutlarında vezir ikonu oluştur
2. `icons/` klasörüne şu isimlerle kaydet:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

Veya ikonsuz da kullanabilirsiniz, çalışmaya devam edecektir.

## 🎮 Kullanım

1. LinkedIn'i aç: [linkedin.com](https://linkedin.com)

2. Queens oyununa git (Games bölümünden)

3. Sağ altta çıkan **👑** butonuna tıkla

4. İki seçenek var:
   - **🤖 Otomatik Çöz**: Oyunu otomatik olarak çözer
   - **👁️ Çözümü Göster**: Sadece çözümü işaretler, sen yerleştirirsin

## 🎨 Renk Sistemi

### LinkedIn Extension'da:

- 🟢 **Yeşil vurgu + beyaz numara**: Yeni çözüm (henüz yerleştirilmemiş vezirler)
- 🟡 **Altın vurgu + koyu numara**: Mevcut vezirler (zaten yerleştirilmiş vezirler)

### Test Sayfasında:

- 🟢 **Yeşil kenarlık**: Çözümde olan ama henüz yerleştirilmemiş pozisyon
- 🟡 **Altın kenarlık**: Manuel yerleştirdiğin ve çözümde de olan vezir
- **♛ Sembolü**: Manuel yerleştirilmiş vezir
- **✕ İşareti**: Engellenmiş hücre
- **Numara**: Hangi sırada yerleştireceğini gösterir

## 🔧 Nasıl Çalışır?

### Algoritma

Extension, klasik **N-Queens** problemini çözmek için **backtracking** algoritması kullanır:

1. Mevcut tahtayı analiz eder
2. Yerleştirilmiş vezirleri ve engellenmiş hücreleri tespit eder
3. Backtracking ile tüm olası çözümleri dener
4. İlk geçerli çözümü bulur ve gösterir

### Kod Yapısı

```
linkedin-queens-solver/
├── manifest.json          # Chrome extension yapılandırması
├── solver.js              # N-Queens solver algoritması
├── content.js             # LinkedIn sayfasıyla etkileşim
├── popup.html             # Extension popup arayüzü
├── popup.js               # Popup script
├── styles.css             # Görsel stiller
└── icons/                 # Extension ikonları
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 🐛 Sorun Giderme

### Extension çalışmıyor

1. Chrome extensions sayfasında extension'ın aktif olduğundan emin ol
2. LinkedIn sayfasını yenile (F5)
3. Console'u aç (F12) ve hata mesajlarını kontrol et

### Oyun bulunamadı hatası

1. Queens oyununun açık olduğundan emin ol
2. Sayfayı yenile
3. Birkaç saniye bekle, oyun yüklenmesi gerekiyor

### Çözüm bulunamadı

- Bu normal! Bazı oyun durumları çözülemez olabilir
- Mevcut vezirlerin konumları çözümü engelliyor olabilir
- Oyunu sıfırlayıp tekrar dene

## 📝 Lisans

Bu proje eğitim amaçlıdır. LinkedIn'in kullanım şartlarına uygun şekilde kullanın.

## 🤝 Katkıda Bulunma

Öneriler ve iyileştirmeler için issue açabilir veya pull request gönderebilirsiniz.

## 🎓 Teknik Detaylar

### Solver Algoritması

N-Queens problemi için klasik backtracking yaklaşımı:

```javascript
function solveNQueens(col, blockedCells) {
  if (col >= size) return true; // Tüm vezirler yerleştirildi

  for (let row = 0; row < size; row++) {
    if (isSafe(row, col, blockedCells)) {
      board[row][col] = 1;

      if (solveNQueens(col + 1, blockedCells)) {
        return true;
      }

      board[row][col] = 0; // Backtrack
    }
  }

  return false;
}
```

### Güvenlik Kontrolü

Bir hücreye vezir yerleştirilebilir mi?

```javascript
function isSafe(row, col) {
  // Satır kontrolü
  // Sütun kontrolü
  // Çapraz kontrolü (4 yön)
  // Engellenmiş hücre kontrolü
}
```

## 🚀 Gelecek Özellikler

- [ ] Birden fazla çözüm gösterme
- [ ] Çözüm animasyonları
- [ ] İstatistik takibi
- [ ] Farklı çözüm stratejileri
- [ ] Dark mode desteği

---

**Made with ❤️ for LinkedIn gamers**
