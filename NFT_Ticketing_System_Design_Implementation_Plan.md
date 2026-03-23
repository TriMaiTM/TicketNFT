# NFT Ticketing System

## System Design & Implementation Plan

**Dự án:** Hệ thống phân phối và kiểm soát vé sự kiện sử dụng NFT  
**Kiến trúc:** Hybrid DApp (Web2 + Web3)  
**Thời gian thực hiện:** 6-8 tuần  
**Giả định trạng thái hiện tại:** Đã có frontend React + Vite cơ bản, đã kết nối MetaMask, đã có smart contract và deploy local, đang ở giai đoạn tích hợp mint flow.

---

## 1. Mục tiêu dự án

- Thay thế vé truyền thống bằng NFT để giảm vé giả.
- Cho phép bán lại vé nhưng vẫn bị kiểm soát giá.
- Tự động trích royalty cho ban tổ chức khi resale.
- Hỗ trợ xác thực check-in bằng QR động để giảm gian lận bằng ảnh chụp màn hình.
- Xây dựng MVP có thể demo được trong 6-8 tuần.

---

## 2. Phạm vi MVP

### In scope

- Trang danh sách sự kiện
- Trang chi tiết sự kiện
- Kết nối ví MetaMask
- Mint vé NFT
- Trang "Vé của tôi"
- Marketplace bán lại vé
- Smart contract xử lý royalty và giá trần resale
- QR động cho check-in
- Trang staff quét QR
- Backend lưu event metadata, logs, QR sessions
- IPFS lưu metadata và hình ảnh

### Out of scope

- Fiat payment gateway
- Mobile app native
- Multi-chain
- Seat map phức tạp
- KYC/AML
- Social login
- Fully decentralized check-in

---

## 3. Tổng quan kiến trúc hệ thống

Hệ thống được chia thành 3 lớp lớn:

### 3.1. Frontend layer

- **Tech stack:** React + Vite + TypeScript + TailwindCSS v4
- **Trách nhiệm:**
  - Hiển thị giao diện cho user, organizer, staff
  - Kết nối ví bằng `ethers.js v6`
  - Gọi smart contract cho các giao dịch cần ký
  - Gọi backend API để lấy dữ liệu nhanh
  - Hiển thị QR động và giao diện scan QR

### 3.2. Smart contract layer

- **Tech stack:** Solidity + Hardhat + OpenZeppelin
- **Trách nhiệm:**
  - Quản lý quyền sở hữu vé NFT
  - Xử lý mint
  - Enforce quy tắc resale
  - Tính royalty
  - Emit events cho backend index

### 3.3. Backend layer

- **Tech stack:** Node.js + Express + MongoDB
- **Trách nhiệm:**
  - Lưu event metadata
  - Lưu tickets read-model
  - Lưu listings read-model
  - Tạo QR session
  - Verify QR check-in
  - Lưu audit log
  - Đồng bộ dữ liệu từ blockchain về MongoDB

### 3.4. Decentralized storage

- **Tech stack:** IPFS thông qua Pinata
- **Lưu trữ:**
  - Hình ảnh vé
  - Metadata JSON cho tokenURI

---

## 4. Nguyên tắc kiến trúc

- Blockchain là source of truth cho ownership.
- Backend là source of truth cho check-in state của MVP.
- Frontend chỉ đọc trực tiếp blockchain ở các hành động cần signer.
- UI list dữ liệu chủ yếu đọc từ backend để nhanh và dễ join dữ liệu.
- Check-in không đưa lên blockchain để tránh tốn gas.
- Resale logic phải được enforce on-chain, không chỉ validate ở frontend.

---

## 5. Thành phần hệ thống

## 5.1. Frontend user app

- Xem danh sách sự kiện
- Xem chi tiết sự kiện
- Mua vé NFT
- Xem vé đã sở hữu
- Tạo QR động
- Bán lại vé
- Mua vé resale

## 5.2. Frontend organizer/admin

- Tạo sự kiện
- Tạo ticket tier
- Theo dõi vé đã bán
- Xem thống kê check-in
- Quản lý staff

## 5.3. Frontend staff check-in

- Đăng nhập staff
- Quét QR bằng camera
- Gửi payload lên backend verify
- Hiển thị kết quả hợp lệ / thất bại

## 5.4. Smart contracts

- `TicketNFT.sol`
- `TicketMarketplace.sol`

## 5.5. Backend modules

- Auth
- Users
- Events
- Tickets
- Marketplace
- QR
- Check-in
- Blockchain indexer

---

## 6. Luồng nghiệp vụ cốt lõi

## 6.1. Luồng mua vé gốc

1. User vào trang chi tiết sự kiện.
2. Frontend lấy dữ liệu event và tier từ backend.
3. User connect MetaMask.
4. User bấm "Mua vé".
5. Frontend gọi `mintTicket(tierId)` trên contract `TicketNFT`.
6. Contract validate giá, supply, trạng thái tier.
7. NFT được mint vào ví user.
8. Contract emit event `TicketMinted`.
9. Backend indexer cập nhật MongoDB.
10. Vé xuất hiện trong "Vé của tôi".

## 6.2. Luồng resale

1. User vào trang "Vé của tôi".
2. Chọn vé cần bán lại.
3. Frontend gọi `approve()` cho marketplace.
4. Frontend gọi `createListing(tokenId, price)` trên `TicketMarketplace`.
5. Contract kiểm tra owner và giá trần.
6. Listing active và emit event.
7. Indexer cập nhật DB.
8. Buyer xem listing và gọi `buyListing(listingId)`.
9. Contract chia tiền cho seller và organizer.
10. NFT được transfer sang buyer.
11. Indexer cập nhật owner và listing status.

## 6.3. Luồng check-in bằng QR động

1. User mở trang "Vé của tôi".
2. Frontend gọi backend tạo QR session.
3. Backend verify user đang sở hữu token.
4. Backend tạo payload QR gồm `sessionId`, `tokenId`, `eventId`, `walletAddress`, `nonce`, `issuedAt`, `expiresAt`, `signature`.
5. Frontend render QR.
6. QR tự refresh mỗi 10-15 giây.
7. Staff quét QR và gửi payload lên backend.
8. Backend verify:
   - chữ ký hợp lệ
   - QR chưa hết hạn
   - `nonce` chưa bị dùng
   - token vẫn do ví đó sở hữu
   - token chưa check-in
9. Nếu hợp lệ:
   - đánh dấu `nonce` đã dùng
   - đánh dấu vé đã check-in
   - lưu log
10. Trả kết quả thành công hoặc lý do từ chối.

---

## 7. Smart contract design

## 7.1. Vì sao nên tách contract

Không nên để tất cả logic mint, resale, royalty trong cùng một contract. Thiết kế đúng hơn cho MVP là:

- `TicketNFT.sol`: quản lý NFT vé
- `TicketMarketplace.sol`: quản lý list, cancel, buy resale

Lợi ích:

- Dễ test
- Dễ sửa
- Dễ mở rộng
- Trách nhiệm rõ ràng

---

## 7.2. `TicketNFT.sol`

### Mục tiêu

- Tạo event on-chain
- Tạo ticket tier
- Mint ticket NFT
- Cung cấp dữ liệu tier cho marketplace

### Structs

```solidity
struct EventInfo {
    uint256 eventId;
    string name;
    uint256 startTime;
    uint256 endTime;
    address organizer;
    bool active;
}

struct TicketTier {
    uint256 tierId;
    uint256 eventId;
    string name;
    uint256 price;
    uint256 maxSupply;
    uint256 minted;
    uint96 royaltyBps;
    uint256 maxResalePrice;
    bool active;
}

struct TicketData {
    uint256 tokenId;
    uint256 eventId;
    uint256 tierId;
}
```

### Storage

- `mapping(uint256 => EventInfo) public events`
- `mapping(uint256 => TicketTier) public tiers`
- `mapping(uint256 => TicketData) public ticketData`
- `mapping(address => bool) public organizers`
- `uint256 public nextEventId`
- `uint256 public nextTierId`
- `uint256 public nextTokenId`

### Hàm chính

- `createEvent(...)`
- `createTicketTier(...)`
- `mintTicket(uint256 tierId)`
- `getTier(uint256 tierId)`
- `getTicketData(uint256 tokenId)`
- `setOrganizer(address organizer, bool allowed)`
- `setTierActive(uint256 tierId, bool active)`

### Event logs

- `EventCreated`
- `TicketTierCreated`
- `TicketMinted`
- `OrganizerUpdated`

### Validation rules

- Chỉ organizer/admin mới được tạo event và tier
- `maxSupply > 0`
- `royaltyBps <= 10000`
- `minted < maxSupply`
- `msg.value == price`

---

## 7.3. `TicketMarketplace.sol`

### Mục tiêu

- Tạo listing
- Hủy listing
- Mua listing
- Enforce max resale price
- Tự động chia royalty

### Struct

```solidity
struct Listing {
    uint256 listingId;
    uint256 tokenId;
    address seller;
    uint256 price;
    bool active;
}
```

### Storage

- `address public ticketNFT`
- `uint256 public nextListingId`
- `mapping(uint256 => Listing) public listings`

### Hàm chính

- `createListing(uint256 tokenId, uint256 price)`
- `cancelListing(uint256 listingId)`
- `buyListing(uint256 listingId)`
- `getListing(uint256 listingId)`

### Security requirements

- Dùng `ReentrancyGuard`
- Validate seller là owner
- Validate listing còn active
- Validate `price <= maxResalePrice`
- Dùng checks-effects-interactions

### Event logs

- `ListingCreated`
- `ListingCancelled`
- `ListingSold`

---

## 8. Data model

## 8.1. On-chain data

Chỉ lưu dữ liệu cốt lõi:

- `tokenId`
- `owner`
- `eventId`
- `tierId`
- `tokenURI`
- `listingId`
- `seller`
- `listing price`

Không nên lưu `checkedIn` on-chain trong MVP vì:

- Tốn gas
- Không cần thiết cho tính minh bạch của quyền sở hữu
- Check-in cần realtime và linh hoạt

## 8.2. MongoDB collections

### `users`

- `walletAddress`
- `role`
- `name`
- `status`
- `createdAt`
- `updatedAt`

### `events`

- `eventId`
- `name`
- `description`
- `date`
- `location`
- `bannerUrl`
- `organizerWallet`
- `status`
- `createdAt`
- `updatedAt`

### `ticketTiers`

- `tierId`
- `eventId`
- `name`
- `price`
- `maxSupply`
- `minted`
- `royaltyBps`
- `maxResalePrice`
- `active`

### `tickets`

- `tokenId`
- `eventId`
- `tierId`
- `ownerWallet`
- `tokenUri`
- `mintTxHash`
- `checkedIn`
- `checkedInAt`
- `status`

### `listings`

- `listingId`
- `tokenId`
- `sellerWallet`
- `price`
- `status`
- `createdAt`
- `updatedAt`

### `qrSessions`

- `sessionId`
- `tokenId`
- `eventId`
- `walletAddress`
- `nonce`
- `issuedAt`
- `expiresAt`
- `used`
- `usedAt`
- `status`

### `checkInLogs`

- `eventId`
- `tokenId`
- `walletAddress`
- `staffUserId`
- `result`
- `reason`
- `scannedAt`
- `sessionId`

### `chainSyncState`

- `contractAddress`
- `lastSyncedBlock`
- `updatedAt`

---

## 9. API design

## 9.1. Auth APIs

- `POST /auth/wallet/challenge`
- `POST /auth/wallet/verify`
- `GET /auth/me`

## 9.2. Event APIs

- `GET /events`
- `GET /events/:id`
- `POST /admin/events`
- `PUT /admin/events/:id`

## 9.3. Ticket APIs

- `GET /me/tickets`
- `GET /tickets/:tokenId`

## 9.4. Marketplace APIs

- `GET /marketplace/listings`
- `GET /marketplace/listings/:id`
- `GET /events/:eventId/listings`

## 9.5. QR & Check-in APIs

- `POST /qr/session`
- `POST /checkin/verify`
- `GET /admin/events/:eventId/checkins`
- `GET /admin/events/:eventId/checkin-stats`

## 9.6. Internal APIs

- `POST /internal/indexer/resync`

---

## 10. Dynamic QR design

## 10.1. Vấn đề của thiết kế cũ

Nếu QR chỉ gồm `tokenId + timestamp + user signature` với TTL 3 phút, hệ thống vẫn có nguy cơ:

- Screenshot vẫn có hiệu lực trong khoảng thời gian dài
- Không có nonce để chặn replay
- UX kém nếu user phải MetaMask sign liên tục

## 10.2. Thiết kế đề xuất

### Payload

- `sessionId`
- `tokenId`
- `eventId`
- `walletAddress`
- `nonce`
- `issuedAt`
- `expiresAt`
- `signature`

### TTL

- TTL đề xuất: 10-20 giây
- Refresh trước khi hết hạn, ví dụ 10 giây

### Verify rules

- Signature do backend tạo là hợp lệ
- `expiresAt` chưa hết
- `nonce` chưa dùng
- Owner hiện tại vẫn hợp lệ
- Ticket chưa check-in

### Vì sao cách này tốt hơn

- Chống replay tốt hơn
- Chống screenshot tốt hơn
- Không cần bắt user ký ví mỗi lần
- Dùng được cho demo và MVP thực tế

---

## 11. Cấu trúc thư mục đề xuất

## 11.1. Root

```text
project-root/
  frontend/
  backend/
  smart-contract/
  docs/
  README.md
```

## 11.2. Frontend

```text
frontend/
  src/
    api/
    app/
    components/
    features/
    hooks/
    layouts/
    pages/
    utils/
    styles/
    main.tsx
```

## 11.3. Backend

```text
backend/
  src/
    config/
    middlewares/
    models/
    modules/
    services/
    jobs/
    utils/
    app.js
    server.js
```

## 11.4. Smart contract

```text
smart-contract/
  contracts/
    TicketNFT.sol
    TicketMarketplace.sol
  scripts/
  test/
  artifacts/
  hardhat.config.ts
```

---

## 12. Implementation plan theo phases

## Phase 1 - Foundation & contract base

### Mục tiêu

- Có workspace chạy được
- Có contract cơ bản
- Có kết nối ví

### Status

- Đã hoàn thành phần lớn

### Tasks

- **PH1-01: Khởi tạo monorepo**
  - Mô tả:
    - tạo `frontend`, `backend`, `smart-contract`
    - cấu hình scripts cơ bản
  - Kết quả mong đợi:
    - dự án có cấu trúc rõ ràng

- **PH1-02: Setup frontend React + Vite + TypeScript**
  - Mô tả:
    - khởi tạo frontend app và route cơ bản
  - Kết quả mong đợi:
    - frontend chạy local

- **PH1-03: Setup Hardhat project**
  - Mô tả:
    - khởi tạo hardhat, config compile/test/deploy
  - Kết quả mong đợi:
    - contract deploy được lên localhost

- **PH1-04: Viết `TicketNFT.sol` ban đầu**
  - Mô tả:
    - xây dựng mint flow cơ bản
  - Kết quả mong đợi:
    - có thể mint ticket NFT

- **PH1-05: Viết unit tests cho mint**
  - Mô tả:
    - test success và fail cases
  - Kết quả mong đợi:
    - contract pass test cơ bản

- **PH1-06: Tích hợp MetaMask**
  - Mô tả:
    - connect wallet và hiển thị địa chỉ ví
  - Kết quả mong đợi:
    - user connect ví thành công

---

## Phase 2 - Web3 integration & mint flow

### Mục tiêu

- User mua vé trên frontend
- Hiển thị "Vé của tôi"

### Tasks

- **PH2-01: Nhúng ABI contract vào frontend**
  - Mô tả:
    - import ABI và địa chỉ contract
  - Kết quả mong đợi:
    - frontend có thể tạo contract instance

- **PH2-02: Xây web3 service dùng chung**
  - Mô tả:
    - tách logic get provider, signer, contract ra khỏi component
  - Kết quả mong đợi:
    - code dễ bảo trì và tái sử dụng

- **PH2-03: Tích hợp `mintTicket()`**
  - Mô tả:
    - user bấm mua vé, frontend gọi giao dịch blockchain
    - xử lý `pending`, `success`, `error`
  - Kết quả mong đợi:
    - user mua vé thành công từ UI

- **PH2-04: Tạo trang "Vé của tôi"**
  - Mô tả:
    - hiển thị danh sách token user đang sở hữu
  - Kết quả mong đợi:
    - user xem được vé của mình

- **PH2-05: Đồng bộ metadata ticket để hiển thị UI**
  - Mô tả:
    - hiển thị tên event, tier, tokenId, tokenURI
  - Kết quả mong đợi:
    - UI vé dễ đọc và đủ thông tin

---

## Phase 3 - Backend, MongoDB, IPFS, indexing

### Mục tiêu

- Có backend API
- Có event metadata
- Có blockchain indexer
- Có lưu trữ IPFS

### Tasks

- **PH3-01: Khởi tạo Express backend**
  - Mô tả:
    - setup server, env, CORS, middleware lỗi
  - Kết quả mong đợi:
    - backend health check hoạt động

- **PH3-02: Kết nối MongoDB**
  - Mô tả:
    - tạo các models cơ bản
  - Kết quả mong đợi:
    - lưu được dữ liệu hệ thống

- **PH3-03: Thiết kế và tạo collections chính**
  - Mô tả:
    - `users`, `events`, `ticketTiers`, `tickets`, `listings`, `qrSessions`, `checkInLogs`, `chainSyncState`
  - Kết quả mong đợi:
    - schema đầy đủ cho MVP

- **PH3-04: Xây API event metadata**
  - Mô tả:
    - tạo, cập nhật, lấy danh sách, lấy chi tiết sự kiện
  - Kết quả mong đợi:
    - frontend đọc event data từ backend

- **PH3-05: Upload metadata lên IPFS qua Pinata**
  - Mô tả:
    - upload ảnh vé và metadata JSON
  - Kết quả mong đợi:
    - nhận được `tokenURI`

- **PH3-06: Xây blockchain indexer**
  - Mô tả:
    - lắng nghe events mint, transfer, listing
    - đồng bộ về MongoDB
  - Kết quả mong đợi:
    - DB phản ánh được state on-chain

- **PH3-07: Viết job re-sync block**
  - Mô tả:
    - lưu `lastSyncedBlock`
    - cho phép replay event khi cần
  - Kết quả mong đợi:
    - indexer có thể khôi phục khi gặp lỗi

---

## Phase 4 - Marketplace resale

### Mục tiêu

- Có resale flow hoàn chỉnh
- Enforce royalty và giá trần

### Tasks

- **PH4-01: Tách hoặc tạo `TicketMarketplace.sol`**
  - Mô tả:
    - xây contract riêng cho resale
  - Kết quả mong đợi:
    - resale logic tách riêng, dễ test

- **PH4-02: Implement `createListing()`**
  - Mô tả:
    - tạo listing với validate owner và max price
  - Kết quả mong đợi:
    - user list vé thành công

- **PH4-03: Implement `cancelListing()`**
  - Mô tả:
    - cho phép seller hủy listing
  - Kết quả mong đợi:
    - listing được hủy an toàn

- **PH4-04: Implement `buyListing()`**
  - Mô tả:
    - buyer mua vé, contract chia tiền, transfer NFT
  - Kết quả mong đợi:
    - resale chạy end-to-end

- **PH4-05: Viết tests cho marketplace**
  - Mô tả:
    - test price cap, royalty, invalid owner, sold flow
  - Kết quả mong đợi:
    - marketplace pass test

- **PH4-06: Xây frontend list vé**
  - Mô tả:
    - UI approve và tạo listing
  - Kết quả mong đợi:
    - user bán lại được vé

- **PH4-07: Xây frontend mua resale**
  - Mô tả:
    - UI xem listing và mua lại
  - Kết quả mong đợi:
    - buyer mua được resale ticket

- **PH4-08: Đồng bộ listings vào MongoDB**
  - Mô tả:
    - index create, cancel, sold
  - Kết quả mong đợi:
    - UI read model nhanh và đúng

---

## Phase 5 - Dynamic QR & check-in

### Mục tiêu

- Xác thực vé bằng QR động
- Chống screenshot và replay

### Tasks

- **PH5-01: Thiết kế QR payload mới**
  - Mô tả:
    - payload gồm `sessionId`, `tokenId`, `eventId`, `walletAddress`, `nonce`, `issuedAt`, `expiresAt`, `signature`
  - Kết quả mong đợi:
    - có QR spec an toàn cho MVP

- **PH5-02: Xây API tạo QR session**
  - Mô tả:
    - backend verify owner và tạo QR session TTL ngắn
  - Kết quả mong đợi:
    - frontend nhận được QR hợp lệ

- **PH5-03: Xây QR UI tự động refresh**
  - Mô tả:
    - refresh 10-15 giây, hiển thị countdown
  - Kết quả mong đợi:
    - user có QR động để xuất trình

- **PH5-04: Xây API verify check-in**
  - Mô tả:
    - verify signature, TTL, nonce, ownership, checkedIn
  - Kết quả mong đợi:
    - trả kết quả xác thực chính xác

- **PH5-05: Implement replay protection**
  - Mô tả:
    - mark nonce đã dùng ngay khi scan thành công
  - Kết quả mong đợi:
    - không thể dùng lại cùng một QR

- **PH5-06: Xây giao diện staff scan QR**
  - Mô tả:
    - sử dụng camera để scan và gọi API verify
  - Kết quả mong đợi:
    - nhân viên có công cụ soát vé

- **PH5-07: Ghi log check-in**
  - Mô tả:
    - lưu thành công / thất bại / lý do
  - Kết quả mong đợi:
    - có audit trail cho demo và thống kê

---

## Phase 6 - Hardening & deployment

### Mục tiêu

- Demo được trên testnet
- Có tài liệu và kịch bản trình bày

### Tasks

- **PH6-01: Deploy contracts lên testnet**
  - Mô tả:
    - deploy lên Polygon Amoy hoặc testnet EVM phù hợp
  - Kết quả mong đợi:
    - contracts online trên testnet

- **PH6-02: Deploy backend**
  - Mô tả:
    - deploy Express app và config env
  - Kết quả mong đợi:
    - API online

- **PH6-03: Deploy frontend**
  - Mô tả:
    - deploy lên Vercel
  - Kết quả mong đợi:
    - giao diện online

- **PH6-04: Test end-to-end**
  - Mô tả:
    - create event -> mint -> resale -> check-in
  - Kết quả mong đợi:
    - toàn bộ flow chạy thông suốt

- **PH6-05: Viết deployment guide**
  - Mô tả:
    - tài liệu setup local, deploy, test
  - Kết quả mong đợi:
    - có tài liệu handoff

- **PH6-06: Hoàn thiện báo cáo đồ án**
  - Mô tả:
    - cập nhật kiến trúc, screenshot, test cases, kết quả
  - Kết quả mong đợi:
    - báo cáo khớp với sản phẩm

---

## 13. Roadmap theo tuần

## Tuần 1

- Setup workspace
- Setup frontend
- Setup Hardhat
- Viết NFT contract cơ bản
- Unit tests mint
- Kết nối MetaMask

## Tuần 2

- Tích hợp `mintTicket()` vào frontend
- Hoàn thành trang "Vé của tôi"
- Xử lý transaction status

## Tuần 3

- Khởi tạo backend Express
- Kết nối MongoDB
- Tạo schema và event APIs
- Upload metadata lên IPFS

## Tuần 4

- Viết blockchain indexer
- Đồng bộ tickets về DB
- Tạo marketplace contract
- Viết tests resale

## Tuần 5

- Frontend list resale
- Frontend buy resale
- Đồng bộ listings và ownership

## Tuần 6

- Tạo QR session APIs
- UI QR động
- Staff scan page
- Verify check-in API

## Tuần 7

- Test fraud scenarios
- Fix bug
- Hoàn thiện dashboard organizer
- Thống kê check-in

## Tuần 8

- Deploy testnet
- Deploy frontend/backend
- Test tổng
- Chuẩn bị demo và báo cáo

---

## 14. Rủi ro và cách xử lý

## 14.1. Smart contract security

### Rủi ro

- Reentrancy trong resale
- Sai access control
- Sai logic chia tiền

### Cách xử lý

- Dùng OpenZeppelin
- Dùng `ReentrancyGuard`
- Viết đầy đủ unit tests
- Review logic trước deploy testnet

## 14.2. QR anti-fraud chưa đủ mạnh

### Rủi ro

- QR bị screenshot
- Replay QR

### Cách xử lý

- TTL ngắn 10-20 giây
- `nonce` dùng một lần
- Verify owner realtime
- Mark `used` ngay sau check-in

## 14.3. Dữ liệu frontend phụ thuộc quá nhiều vào blockchain

### Rủi ro

- Chậm
- Khó hiển thị thông tin tổng hợp

### Cách xử lý

- Xây backend read-model
- Xây blockchain indexer

## 14.4. Gas fee cao

### Rủi ro

- UX kém

### Cách xử lý

- Dùng testnet/L2
- Không đưa check-in lên chain
- Hạn chế storage không cần thiết

## 14.5. Dùng `signMessage` liên tục gây UX xấu

### Rủi ro

- User khó sử dụng
- Check-in chậm

### Cách xử lý

- Dùng server-signed QR session
- Không bắt user ký ví mỗi lần refresh

---

## 15. Kiểm thử cần có

## 15.1. Smart contract tests

- Mint thành công
- Mint sai giá
- Mint vượt supply
- Tạo listing hợp lệ
- Tạo listing vượt giá trần
- Cancel listing
- Buy listing
- Chia royalty đúng
- Invalid owner bị từ chối

## 15.2. Backend tests

- Auth bằng wallet
- Event CRUD
- Tạo QR session
- Verify QR thành công
- Verify QR hết hạn
- Verify replay QR
- Verify ticket đã check-in

## 15.3. Frontend tests / manual tests

- Connect MetaMask
- Mint ticket
- Hiển thị danh sách vé
- Tạo resale listing
- Mua resale listing
- Render QR động
- Scan QR và trả kết quả

---

## 16. Trạng thái hiện tại và next steps ưu tiên

### Bạn đã có

- Các thư mục `frontend`, `backend`, `smart-contract`
- Frontend chạy được
- MetaMask connect được
- Contract deploy local
- Có dấu hiệu đã test transaction cơ bản

### Ưu tiên ngay lúc này

1. Hoàn thiện `mintTicket()` từ frontend
2. Tạo trang "Vé của tôi"
3. Khởi tạo backend và MongoDB
4. Thêm IPFS metadata
5. Tách/hoàn thiện marketplace contract
6. Làm QR động đúng cách

---

## 17. Kết luận

Hướng đi hiện tại của dự án là đúng, nhưng để hệ thống dễ bảo trì và thuyết phục hơn trong báo cáo, cần chốt các quyết định sau:

- Tách `TicketNFT` và `TicketMarketplace`
- Thêm backend indexer
- Mở rộng MongoDB schema
- Dùng QR động có `nonce` và TTL ngắn
- Giữ ownership on-chain, check-in off-chain

Nếu làm theo tài liệu này, bạn sẽ có:

- Một architecture hợp lý cho đồ án
- Một implementation plan để code tiếp ngay
- Một khung nội dung có thể đưa vào báo cáo và thuyết trình

