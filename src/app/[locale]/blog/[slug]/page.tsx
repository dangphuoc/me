'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  User,
} from 'lucide-react';

// Blog posts metadata and content
const blogPosts: Record<string, {
  title: { vi: string; en: string };
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  image: string;
  content: { vi: string; en: string };
}> = {
  'building-reactive-systems': {
    title: {
      vi: 'Xây dựng Reactive Systems - Từ Manifesto đến Thực tiễn',
      en: 'Building Reactive Systems - From Manifesto to Practice',
    },
    author: 'Phuoc Nguyen',
    date: '2024-01-20',
    readTime: 18,
    tags: ['Reactive', 'Architecture', 'Resilience', 'System Design'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
    content: {
      vi: `
# Hành trình xây dựng những hệ thống không bao giờ ngủ

> 📚 *Bài viết này là phần 2 trong series Reactive. Nếu bạn chưa đọc, hãy bắt đầu với **[Non-Blocking I/O - Nghệ thuật không chờ đợi](/vi/blog/non-blocking-io)** để hiểu về Event Loop và Async Programming.*

Bạn có bao giờ tự hỏi tại sao Netflix vẫn chạy mượt mà khi cả triệu người cùng xem phim vào tối thứ Bảy? Hay tại sao hệ thống ngân hàng vẫn xử lý được hàng nghìn giao dịch mỗi giây mà không "sập"?

Câu trả lời nằm ở một triết lý thiết kế đã thay đổi cách chúng ta xây dựng phần mềm: **Reactive Systems**.

> *"The best way to predict the future is to create it."* — Peter Drucker

---

## Câu chuyện bắt đầu từ một bản Tuyên ngôn

![The Reactive Manifesto](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800)

Ngày 16 tháng 9 năm 2014, một nhóm kỹ sư hàng đầu thế giới, dẫn đầu bởi **Jonas Bonér**, đã công bố một tài liệu quan trọng mà họ gọi là **The Reactive Manifesto**. Đây không chỉ là một tài liệu kỹ thuật khô khan - nó là một tầm nhìn về tương lai của phần mềm.

Họ nhận ra rằng thế giới đang thay đổi. Người dùng không còn chấp nhận việc chờ đợi. Họ muốn mọi thứ phải **ngay lập tức**. Và quan trọng hơn, họ mong đợi hệ thống **luôn sẵn sàng** - 24/7, không có ngoại lệ.

> *"Users expect millisecond response times and 100% uptime."* — The Reactive Manifesto

---

## Bốn trụ cột của một hệ thống bất bại

Hãy tưởng tượng một ngôi nhà vững chãi. Nó cần có nền móng chắc, tường dày, mái kiên cố và hệ thống thông gió tốt. Reactive Systems cũng vậy - nó được xây dựng trên bốn trụ cột không thể tách rời.

![Four Pillars](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800)

**Responsive - Luôn phản hồi:** Giống như một người bồi bàn giỏi, hệ thống phải luôn sẵn sàng phục vụ. Không phải "chờ chút" hay "thử lại sau". Mà là **ngay bây giờ**.

**Resilient - Không bao giờ gục ngã:** Lỗi sẽ xảy ra. Đó là điều chắc chắn. Nhưng một hệ thống resilient biết cách đứng dậy sau mỗi lần vấp ngã. Nó cô lập failures, tự phục hồi, và tiếp tục phục vụ.

> *"It's not about avoiding failure; it's about recovering gracefully."*

**Elastic - Linh hoạt như nước:** Khi traffic tăng đột biến vào Black Friday, hệ thống tự động mở rộng. Khi mọi thứ yên ắng lúc 3 giờ sáng, nó thu nhỏ lại để tiết kiệm tài nguyên. Không cần ai can thiệp.

**Message Driven - Giao tiếp thông minh:** Thay vì "gọi điện và chờ đợi", các thành phần trong hệ thống "gửi tin nhắn và tiếp tục công việc". Đây là bí mật giúp mọi thứ hoạt động trơn tru.

---

## Khi mọi thứ đều kết nối với nhau

![System Architecture](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800)

Điều kỳ diệu của Reactive Systems nằm ở cách bốn trụ cột này tương tác. **Message Driven** là nền tảng - nó cho phép các thành phần giao tiếp mà không cần chờ đợi nhau. Từ đó, **Elastic** và **Resilient** được xây dựng lên, như những bức tường vững chắc. Và cuối cùng, **Responsive** là kết quả - là trải nghiệm mà người dùng cảm nhận được.

Thiếu một trong bốn, ngôi nhà sẽ đổ. Đó là lý do tại sao chúng ta không thể chọn lọc - phải có đủ cả bốn.

---

## Non-Blocking I/O - Nghệ thuật không chờ đợi

Hãy tưởng tượng bạn đang ở một nhà hàng. Bạn gọi món, và người phục vụ... đứng đó chờ đầu bếp nấu xong mới đi phục vụ bàn khác. Nghe có vẻ ngớ ngẩn phải không? Nhưng đó chính xác là cách **Blocking I/O** hoạt động.

![Restaurant Analogy](https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800)

Với **Non-Blocking I/O**, người phục vụ ghi order, chuyển cho bếp, và ngay lập tức đi phục vụ bàn khác. Khi món ăn xong, họ được thông báo và mang ra cho khách. Đơn giản, hiệu quả, và... reactive.

> *"Don't wait for the future. Create it."*

**Netty** - một framework mạnh mẽ - đã hiện thực hóa điều này. Với Netty, một vài threads có thể xử lý hàng nghìn connections cùng lúc. Không còn cảnh một thread bị "kẹt" chờ database hay network response.

---

## Resilience Patterns - Những bài học từ tự nhiên

Tự nhiên đã dạy chúng ta rất nhiều về resilience. Con tắc kè đổi màu để sinh tồn. Cây liễu cong mình theo gió thay vì gãy đổ. Và hệ thống của chúng ta cũng cần những chiến lược tương tự.

![Nature Resilience](https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800)

**Retry Pattern** - Thử lại với sự kiên nhẫn: Đôi khi, lỗi chỉ là tạm thời. Mạng chập chờn, server quá tải trong một khoảnh khắc. Thay vì bỏ cuộc ngay, hãy thử lại - nhưng thông minh hơn, với khoảng cách thời gian tăng dần. 1 giây... 2 giây... 4 giây...

> *"Fall seven times, stand up eight."* — Japanese Proverb

**Circuit Breaker** - Biết khi nào nên dừng lại: Giống như cầu dao điện trong nhà bạn, Circuit Breaker sẽ "ngắt mạch" khi phát hiện quá nhiều lỗi. Nó ngăn không cho lỗi lan truyền như hiệu ứng domino, và cho hệ thống thời gian để phục hồi.

![Circuit Breaker](https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800)

**Bulkhead** - Cô lập để bảo vệ: Trên những con tàu lớn, các khoang được ngăn cách riêng biệt. Nếu một khoang bị thủng, nước chỉ tràn vào khoang đó - tàu vẫn nổi. Trong hệ thống của chúng ta, mỗi service cũng nên được cô lập như vậy.

**Rate Limiter** - Kiểm soát nhịp độ: Đôi khi, bảo vệ hệ thống nghĩa là biết nói "không". Rate Limiter giúp kiểm soát lượng request, đảm bảo không ai bị quá tải.

**Fallback** - Luôn có phương án B: Khi mọi thứ thất bại, fallback là người hùng thầm lặng. Trả về dữ liệu cache, sử dụng giá trị mặc định, hoặc chuyển sang backup service - miễn là người dùng không nhìn thấy lỗi.

---

## Commands và Events - Hai ngôn ngữ khác nhau

Trong thế giới của Message Driven, có hai cách giao tiếp chính, và việc hiểu sự khác biệt này rất quan trọng.

![Communication](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800)

**Commands** giống như việc bạn gọi điện cho ai đó và nói: *"Chuyển tiền vào tài khoản này ngay!"*. Bạn biết rõ ai sẽ thực hiện, và bạn mong đợi kết quả.

**Events** lại khác - nó như việc bạn đăng một status: *"Giao dịch ABC đã hoàn thành"*. Bạn không quan tâm ai đọc được - những ai quan tâm sẽ tự phản ứng.

> *"Tell, don't ask."*

Sự khác biệt này tưởng chừng nhỏ, nhưng ảnh hưởng lớn đến cách hệ thống được thiết kế. Events cho phép loose coupling - các service không cần biết về nhau, chỉ cần quan tâm đến những events liên quan.

---

## Kết quả thực tế

Khi áp dụng đúng cách, Reactive Systems có thể mang đến những kết quả ấn tượng:

![Results](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800)

| Metric | Traditional | Reactive |
|--------|-------------|----------|
| Throughput | 10K TPS | 100K+ TPS |
| Latency P99 | 500ms | 50ms |
| Availability | 99.9% | 99.99% |

Những con số này không phải là lý thuyết - đó là kết quả từ những hệ thống thực tế đang phục vụ hàng triệu người dùng mỗi ngày.

---

## Hành trình chưa kết thúc

![Journey](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800)

Xây dựng Reactive Systems không phải là một điểm đến, mà là một hành trình. Nó đòi hỏi sự thay đổi trong tư duy - từ việc nghĩ về "requests" sang nghĩ về "events", từ "synchronous" sang "asynchronous", từ "monolith" sang "distributed".

> *"The journey of a thousand miles begins with a single step."* — Lao Tzu

Nhưng một khi bạn bắt đầu, bạn sẽ không muốn quay lại. Bởi vì bạn đã nhìn thấy một cách tốt hơn để xây dựng phần mềm - những hệ thống thực sự sẵn sàng cho tương lai.

---

## Đọc thêm

- [The Reactive Manifesto](https://www.reactivemanifesto.org/)
- [Release It! - Michael Nygard](https://pragprog.com/titles/mnee2/release-it-second-edition/)
- [Designing Data-Intensive Applications](https://dataintensive.net/)
      `,
      en: `
# The Journey of Building Systems That Never Sleep

> *This is Part 2 in the Reactive series. If you haven't read it yet, start with **[Non-Blocking I/O - The Art of Not Waiting](/en/blog/non-blocking-io)** to understand Event Loop and Async Programming.*

Have you ever wondered why Netflix still runs smoothly when millions of people watch movies on Saturday night? Or why banking systems can process thousands of transactions per second without crashing?

The answer lies in a design philosophy that has changed how we build software: **Reactive Systems**.

> *"The best way to predict the future is to create it."* — Peter Drucker

---

## The Story Begins with a Manifesto

![The Reactive Manifesto](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800)

On September 16, 2014, a group of world-leading engineers, led by **Jonas Bonér**, published an important document they called **The Reactive Manifesto**. This wasn't just a dry technical document - it was a vision for the future of software.

They realized the world was changing. Users no longer accept waiting. They want everything to be **instant**. And more importantly, they expect systems to be **always available** - 24/7, no exceptions.

> *"Users expect millisecond response times and 100% uptime."* — The Reactive Manifesto

---

## Four Pillars of an Invincible System

Imagine a sturdy house. It needs a solid foundation, thick walls, a strong roof, and a good ventilation system. Reactive Systems are the same - they're built on four inseparable pillars.

![Four Pillars](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800)

**Responsive - Always Answering:** Like a good waiter, the system must always be ready to serve. Not "wait a moment" or "try again later". But **right now**.

**Resilient - Never Falling:** Failures will happen. That's certain. But a resilient system knows how to stand up after every stumble. It isolates failures, self-heals, and continues serving.

> *"It's not about avoiding failure; it's about recovering gracefully."*

**Elastic - Flexible Like Water:** When traffic spikes on Black Friday, the system automatically scales up. When things are quiet at 3 AM, it scales down to save resources. No intervention needed.

**Message Driven - Smart Communication:** Instead of "calling and waiting", components in the system "send messages and continue working". This is the secret that keeps everything running smoothly.

---

## When Everything Connects

![System Architecture](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800)

The magic of Reactive Systems lies in how these four pillars interact. **Message Driven** is the foundation - it allows components to communicate without waiting for each other. From there, **Elastic** and **Resilient** are built up, like sturdy walls. And finally, **Responsive** is the result - the experience users feel.

Missing one of the four, the house will collapse. That's why we can't be selective - we need all four.

---

## Non-Blocking I/O - The Art of Not Waiting

Imagine you're at a restaurant. You order food, and the waiter... stands there waiting for the chef to finish before serving another table. Sounds silly, right? But that's exactly how **Blocking I/O** works.

![Restaurant Analogy](https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800)

With **Non-Blocking I/O**, the waiter takes the order, passes it to the kitchen, and immediately goes to serve another table. When the food is ready, they're notified and bring it out. Simple, efficient, and... reactive.

> *"Don't wait for the future. Create it."*

**Netty** - a powerful framework - has made this a reality. With Netty, a few threads can handle thousands of connections simultaneously. No more threads getting "stuck" waiting for database or network responses.

---

## Resilience Patterns - Lessons from Nature

Nature has taught us a lot about resilience. Chameleons change color to survive. Willow trees bend with the wind instead of breaking. And our systems need similar strategies.

![Nature Resilience](https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800)

**Retry Pattern** - Try Again with Patience: Sometimes, errors are just temporary. Network hiccups, server overload for a moment. Instead of giving up immediately, try again - but smarter, with increasing intervals. 1 second... 2 seconds... 4 seconds...

> *"Fall seven times, stand up eight."* — Japanese Proverb

**Circuit Breaker** - Know When to Stop: Like a circuit breaker in your house, the Circuit Breaker will "trip" when it detects too many errors. It prevents errors from spreading like a domino effect and gives the system time to recover.

![Circuit Breaker](https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800)

**Bulkhead** - Isolate to Protect: On large ships, compartments are separated. If one compartment is breached, water only floods that compartment - the ship stays afloat. In our systems, each service should be isolated the same way.

**Rate Limiter** - Control the Pace: Sometimes, protecting the system means knowing how to say "no". Rate Limiter helps control request volume, ensuring no one gets overwhelmed.

**Fallback** - Always Have a Plan B: When everything fails, fallback is the silent hero. Return cached data, use default values, or switch to a backup service - as long as users don't see errors.

---

## Commands and Events - Two Different Languages

In the world of Message Driven, there are two main ways to communicate, and understanding this difference is crucial.

![Communication](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800)

**Commands** are like calling someone and saying: *"Transfer money to this account now!"*. You know exactly who will execute it, and you expect results.

**Events** are different - they're like posting a status: *"Transaction ABC completed"*. You don't care who reads it - those who care will react on their own.

> *"Tell, don't ask."*

This difference seems small but has a big impact on how systems are designed. Events allow loose coupling - services don't need to know about each other, just care about relevant events.

---

## Real Results

When applied correctly, Reactive Systems can deliver impressive results:

![Results](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800)

| Metric | Traditional | Reactive |
|--------|-------------|----------|
| Throughput | 10K TPS | 100K+ TPS |
| Latency P99 | 500ms | 50ms |
| Availability | 99.9% | 99.99% |

These numbers aren't theoretical - they're results from real systems serving millions of users every day.

---

## The Journey Continues

![Journey](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800)

Building Reactive Systems isn't a destination, it's a journey. It requires a shift in mindset - from thinking about "requests" to thinking about "events", from "synchronous" to "asynchronous", from "monolith" to "distributed".

> *"The journey of a thousand miles begins with a single step."* — Lao Tzu

But once you start, you won't want to go back. Because you've seen a better way to build software - systems that are truly ready for the future.

---

## Further Reading

- [The Reactive Manifesto](https://www.reactivemanifesto.org/)
- [Release It! - Michael Nygard](https://pragprog.com/titles/mnee2/release-it-second-edition/)
- [Designing Data-Intensive Applications](https://dataintensive.net/)
      `,
    },
  },
  'non-blocking-io': {
    title: {
      vi: 'Non-Blocking I/O - Nghệ thuật không chờ đợi',
      en: 'Non-Blocking I/O - The Art of Not Waiting',
    },
    author: 'Phuoc Nguyen',
    date: '2024-01-25',
    readTime: 15,
    tags: ['Non-Blocking', 'Event Loop', 'Concurrency', 'Backend'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
    content: {
      vi: `
# Câu chuyện về một quán coffee và nghệ thuật không chờ đợi

Có một câu hỏi mà tôi thường đặt ra cho các developer: *"Tại sao code của bạn chạy chậm?"*

Hầu hết sẽ trả lời về thuật toán, về database queries, về network latency. Nhưng ít ai nhận ra vấn đề thực sự: **chờ đợi**.

> *"Time is what we want most, but what we use worst."* — William Penn

---

## Khi chờ đợi trở thành kẻ thù

![Waiting](https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800)

Trong lập trình truyền thống, chúng ta viết code một cách tự nhiên - gọi hàm, chờ kết quả, tiếp tục. Đơn giản và dễ hiểu. Nhưng ẩn sau sự đơn giản đó là một vấn đề lớn: **blocking**.

Mỗi khi thread của bạn chờ database response, nó không làm gì cả. Chỉ... chờ. Trong khi đó, hàng trăm requests khác đang xếp hàng phía sau.

Và khi có sự cố - database chậm, network timeout - những threads đó bị "đóng băng". Tài nguyên cạn kiệt. Hệ thống sụp đổ.

> *"Blocking code is like hiring a waiter who only serves one table at a time."*

---

## Bài học từ quán coffee của anh Hiếu

Để hiểu vấn đề này, hãy cùng tôi ghé thăm quán coffee của anh Hiếu.

![Coffee Shop](https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800)

Anh Hiếu mở quán với một nhân viên duy nhất. Quy trình phục vụ khách hàng khá đơn giản: nhận order, pha chế, thu tiền, giao nước. Mỗi bước mất khoảng 500ms.

Vấn đề là gì? Trong khi nhân viên đang pha chế cho khách A, khách B, C, D phải đứng chờ. **Tuần tự. Một cách đau đớn.**

Đây chính là **Synchronous Programming** - mô hình mà hầu hết chúng ta bắt đầu.

---

## Concurrency - Ảo thuật của sự đồng thời

![Concurrency](https://images.unsplash.com/photo-1518770660439-4636190af475?w=800)

Nhưng khoan, có một khái niệm thú vị cần bàn: **Concurrency**.

Khi bạn vừa nghe nhạc, vừa code, vừa nhấp trà - bạn đang làm nhiều việc "cùng lúc". Nhưng thực ra, não bạn đang **switch** liên tục giữa các tác vụ, nhanh đến mức bạn cảm thấy như đang làm song song.

CPU cũng vậy. Với một core duy nhất, nó switch giữa các threads với tốc độ chóng mặt. Đây gọi là **context switching**.

> *"Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once."* — Rob Pike

---

## Parallelism - Thêm người, thêm việc

Quay lại quán coffee. Anh Hiếu nhận ra vấn đề và thuê thêm anh Lưu. Giờ đây, hai người có thể phục vụ hai khách cùng lúc. **Song song thực sự.**

![Teamwork](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800)

Đây là **Parallelism** - khi bạn có nhiều CPU cores và thực sự chạy nhiều tác vụ đồng thời.

| Concurrency | Parallelism |
|-------------|-------------|
| Một người làm nhiều việc | Nhiều người làm nhiều việc |
| Ảo giác của sự đồng thời | Đồng thời thực sự |
| Context switching | Multiple cores |

Nhưng thuê thêm người không phải lúc nào cũng là giải pháp. Threads tốn memory. Context switching tốn CPU. Và quan trọng hơn, nó không giải quyết được vấn đề gốc rễ: **chờ đợi**.

---

## Cuộc cách mạng mang tên Asynchronous

Một ngày, anh Hiếu có một ý tưởng đột phá. Anh thuê thêm anh Long - không phải để pha chế, mà để... điều phối.

![Async Flow](https://images.unsplash.com/photo-1552664730-d307ca884978?w=800)

Quy trình mới như sau:

Khách đến, anh Long ghi nhận order và đưa cho khách một số thứ tự. *"Anh chị cứ vô bàn ngồi, khi nào xong em gọi."*

Anh Hiếu pha chế liên tục, không cần quan tâm ai đang chờ. Khi xong một ly, anh Long mang ra cho đúng khách.

Còn việc thanh toán? Anh Hiếu để sẵn QR Code - khách tự quét, tự thanh toán. **Không ai cần chờ ai.**

> *"Don't call us, we'll call you."* — The Hollywood Principle

---

## Event Loop - Trái tim của Non-Blocking

Trong câu chuyện trên, anh Long chính là **Event Loop** - vòng lặp vô tận lắng nghe và phân phối công việc.

![Event Loop](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800)

Event Loop có những đặc điểm rất đặc biệt:

Nó **không bao giờ bị block**. Giống như anh Long - anh ấy không tự tay pha chế, chỉ điều phối. Vì vậy anh ấy luôn sẵn sàng nhận khách mới.

Nó **xử lý được lượng lớn events**. Một Event Loop đơn lẻ có thể handle hàng nghìn, thậm chí hàng chục nghìn connections đồng thời.

Đây là nền tảng của **Reactor Pattern** - pattern mà các framework như Node.js, Netty, và Vert.x đều sử dụng.

> *"The Event Loop is like a conductor - it doesn't play any instrument, but the orchestra can't work without it."*

---

## Vert.x và sức mạnh của Multi-Reactor

**Vert.x** là một toolkit đặc biệt. Không phải framework, không phải application server - nó là một bộ công cụ cho phép bạn xây dựng reactive applications theo cách của riêng bạn.

![Vert.x](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800)

Điều đặc biệt của Vert.x là **Multi-Reactor Pattern**. Thay vì một Event Loop, Vert.x có thể chạy nhiều Event Loops - thường là một cho mỗi CPU core.

Hãy tưởng tượng quán coffee của anh Hiếu mở rộng thành chuỗi cửa hàng. Mỗi cửa hàng có một anh Long riêng, hoạt động độc lập. Đó là Multi-Reactor.

---

## Golden Rule: Đừng bao giờ block Event Loop!

![Warning](https://images.unsplash.com/photo-1606606767399-01e271823a2e?w=800)

Đây là quy tắc vàng, quy tắc sống còn, quy tắc không được phép quên:

> **Nếu bạn block Event Loop, hệ thống của bạn sẽ chết.**

Tại sao? Vì Event Loop là single-threaded. Nếu bạn block nó với một tác vụ nặng - đọc file đồng bộ, tính toán phức tạp - không ai khác có thể được phục vụ.

Một handler nên xử lý trong bao lâu? Đơn giản: **càng nhanh càng tốt**. Với traffic 1000 requests/giây và 1 Event Loop, mỗi handler chỉ có 1ms để hoàn thành.

> *"Speed is not about moving fast. It's about not standing still."*

---

## Những điều tôi học được

![Learning](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800)

Sau nhiều năm làm việc với Reactive Programming, đây là những bài học quý giá nhất:

**Concurrency không phải Parallelism.** Hiểu sự khác biệt này là bước đầu tiên để viết code hiệu quả.

**Event Loop là trái tim.** Bảo vệ nó như bảo vệ trái tim của bạn. Đừng bao giờ block nó.

**Tư duy async cần thời gian.** Đừng nản nếu bạn thấy khó khăn ban đầu. Ai cũng vậy cả.

**Vert.x là công cụ mạnh mẽ.** Nhưng sức mạnh đi kèm trách nhiệm. Hiểu rõ trước khi dùng.

> *"The only way to do great work is to love what you do."* — Steve Jobs

---

## Bắt đầu hành trình

![Journey](https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800)

Nếu bạn đang đọc đến đây, có lẽ bạn đã sẵn sàng cho hành trình Reactive. Đó là một hành trình không dễ dàng, nhưng đáng giá.

Bắt đầu nhỏ. Thử viết một handler đơn giản với Vert.x. Cảm nhận sự khác biệt. Và từ từ mở rộng.

> *"The journey of a thousand miles begins with a single step."* — Lao Tzu

---

## Đọc tiếp

Bạn đã hiểu cách Event Loop và Non-Blocking I/O hoạt động. Nhưng làm sao để áp dụng vào thiết kế hệ thống thực tế?

👉 **[Xây dựng Reactive Systems - Từ Manifesto đến Thực tiễn](/vi/blog/building-reactive-systems)** - Khám phá 4 trụ cột của Reactive Manifesto và các Resilience Patterns như Circuit Breaker, Bulkhead, Rate Limiter.

---

## Tài liệu tham khảo

- [Vert.x Documentation](https://vertx.io/docs/)
- [The Reactive Manifesto](https://www.reactivemanifesto.org/)
- [Reactive Programming with Java](https://www.baeldung.com/java-reactive-programming)
      `,
      en: `
# The Story of a Coffee Shop and the Art of Not Waiting

There's a question I often ask developers: *"Why is your code slow?"*

Most will answer about algorithms, database queries, network latency. But few realize the real problem: **waiting**.

> *"Time is what we want most, but what we use worst."* — William Penn

---

## When Waiting Becomes the Enemy

![Waiting](https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800)

In traditional programming, we write code naturally - call a function, wait for results, continue. Simple and easy to understand. But hidden behind that simplicity is a big problem: **blocking**.

Every time your thread waits for a database response, it does nothing. Just... waits. Meanwhile, hundreds of other requests are queuing up behind.

And when incidents occur - slow database, network timeout - those threads get "frozen". Resources get exhausted. The system crashes.

> *"Blocking code is like hiring a waiter who only serves one table at a time."*

---

## Lessons from Mr. Hieu's Coffee Shop

To understand this problem, let me take you to Mr. Hieu's coffee shop.

![Coffee Shop](https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800)

Mr. Hieu opened his shop with just one employee. The customer service process was simple: take order, prepare coffee, collect payment, serve drink. Each step takes about 500ms.

What's the problem? While the employee is preparing for customer A, customers B, C, D have to wait. **Sequential. Painfully.**

This is **Synchronous Programming** - the model most of us start with.

---

## Concurrency - The Illusion of Simultaneity

![Concurrency](https://images.unsplash.com/photo-1518770660439-4636190af475?w=800)

But wait, there's an interesting concept to discuss: **Concurrency**.

When you're listening to music, coding, and sipping tea at the same time - you're doing multiple things "simultaneously". But actually, your brain is **switching** constantly between tasks, so fast that it feels like parallel.

CPUs work the same way. With a single core, it switches between threads at dizzying speed. This is called **context switching**.

> *"Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once."* — Rob Pike

---

## Parallelism - More People, More Work

Back to the coffee shop. Mr. Hieu realized the problem and hired Mr. Luu. Now, two people can serve two customers simultaneously. **True parallelism.**

![Teamwork](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800)

This is **Parallelism** - when you have multiple CPU cores and truly run multiple tasks simultaneously.

| Concurrency | Parallelism |
|-------------|-------------|
| One person doing many things | Many people doing many things |
| Illusion of simultaneity | True simultaneity |
| Context switching | Multiple cores |

But hiring more people isn't always the solution. Threads cost memory. Context switching costs CPU. And more importantly, it doesn't solve the root problem: **waiting**.

---

## The Revolution Called Asynchronous

One day, Mr. Hieu had a breakthrough idea. He hired Mr. Long - not to prepare coffee, but to... coordinate.

![Async Flow](https://images.unsplash.com/photo-1552664730-d307ca884978?w=800)

The new process works like this:

Customer arrives, Mr. Long takes the order and gives them a queue number. *"Please take a seat, we'll call you when ready."*

Mr. Hieu prepares continuously, not caring who's waiting. When a drink is done, Mr. Long brings it to the right customer.

And payment? Mr. Hieu set up a QR Code - customers scan and pay themselves. **No one waits for anyone.**

> *"Don't call us, we'll call you."* — The Hollywood Principle

---

## Event Loop - The Heart of Non-Blocking

In the story above, Mr. Long is the **Event Loop** - an infinite loop that listens and distributes work.

![Event Loop](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800)

The Event Loop has very special characteristics:

It's **never blocked**. Like Mr. Long - he doesn't prepare coffee himself, just coordinates. So he's always ready for new customers.

It can **handle large volumes of events**. A single Event Loop can handle thousands, even tens of thousands of connections simultaneously.

This is the foundation of the **Reactor Pattern** - the pattern that frameworks like Node.js, Netty, and Vert.x all use.

> *"The Event Loop is like a conductor - it doesn't play any instrument, but the orchestra can't work without it."*

---

## Vert.x and the Power of Multi-Reactor

**Vert.x** is a special toolkit. Not a framework, not an application server - it's a set of tools that lets you build reactive applications your own way.

![Vert.x](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800)

What's special about Vert.x is the **Multi-Reactor Pattern**. Instead of one Event Loop, Vert.x can run multiple Event Loops - typically one for each CPU core.

Imagine Mr. Hieu's coffee shop expanding into a chain. Each store has its own Mr. Long, operating independently. That's Multi-Reactor.

---

## Golden Rule: Never Block the Event Loop!

![Warning](https://images.unsplash.com/photo-1606606767399-01e271823a2e?w=800)

This is the golden rule, the survival rule, the rule you must never forget:

> **If you block the Event Loop, your system will die.**

Why? Because the Event Loop is single-threaded. If you block it with a heavy task - synchronous file reading, complex calculations - no one else can be served.

How long should a handler take? Simple: **as fast as possible**. With traffic of 1000 requests/second and 1 Event Loop, each handler has only 1ms to complete.

> *"Speed is not about moving fast. It's about not standing still."*

---

## What I've Learned

![Learning](https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800)

After years of working with Reactive Programming, these are the most valuable lessons:

**Concurrency is not Parallelism.** Understanding this difference is the first step to writing efficient code.

**Event Loop is the heart.** Protect it like you protect your own heart. Never block it.

**Async thinking takes time.** Don't give up if you find it difficult at first. Everyone does.

**Vert.x is a powerful tool.** But power comes with responsibility. Understand it before you use it.

> *"The only way to do great work is to love what you do."* — Steve Jobs

---

## Starting the Journey

![Journey](https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800)

If you're reading this far, you're probably ready for the Reactive journey. It's not an easy journey, but it's worth it.

Start small. Try writing a simple handler with Vert.x. Feel the difference. And gradually expand.

> *"The journey of a thousand miles begins with a single step."* — Lao Tzu

---

## Continue Reading

You now understand how Event Loop and Non-Blocking I/O work. But how do you apply this to real-world system design?

👉 **[Building Reactive Systems - From Manifesto to Practice](/en/blog/building-reactive-systems)** - Discover the 4 pillars of the Reactive Manifesto and Resilience Patterns like Circuit Breaker, Bulkhead, Rate Limiter.

---

## Further Reading

- [Vert.x Documentation](https://vertx.io/docs/)
- [The Reactive Manifesto](https://www.reactivemanifesto.org/)
- [Reactive Programming with Java](https://www.baeldung.com/java-reactive-programming)
      `,
    },
  },
};

export default function BlogPostPage() {
  const t = useTranslations('blog');
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const locale = (pathParts[1] || 'en') as 'vi' | 'en';
  const slug = pathParts[pathParts.length - 1];
  const [copied, setCopied] = useState(false);

  const post = blogPosts[slug];

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!post) {
    return (
      <div className="min-h-screen gradient-bg py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href={`/${locale}/blog`} className="text-blue-600 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post.title[locale];

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        break;
    }
  };

  // Render markdown content with images
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let inTable = false;
    let tableRows: string[] = [];
    let listItems: JSX.Element[] = [];
    let inList = false;
    let listType: 'ul' | 'ol' = 'ul';

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        if (listType === 'ul') {
          elements.push(
            <ul key={`list-${key}`} className="list-disc list-inside space-y-2 mb-6 text-gray-600 dark:text-gray-300 ml-4">
              {listItems}
            </ul>
          );
        } else {
          elements.push(
            <ol key={`list-${key}`} className="list-decimal list-inside space-y-2 mb-6 text-gray-600 dark:text-gray-300 ml-4">
              {listItems}
            </ol>
          );
        }
        listItems = [];
        inList = false;
      }
    };

    const renderTable = (rows: string[], key: number) => {
      if (rows.length < 2) return null;

      const headers = rows[0].split('|').filter(cell => cell.trim());
      const dataRows = rows.slice(2); // Skip header and separator

      return (
        <div key={`table-${key}`} className="overflow-x-auto mb-8 mt-4">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30">
              <tr>
                {headers.map((header, i) => (
                  <th key={i} className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {header.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {dataRows.map((row, rowIdx) => (
                <tr key={rowIdx} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  {row.split('|').filter(cell => cell.trim()).map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {cell.trim().replace(/\*\*(.*?)\*\*/g, '$1')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    lines.forEach((line, i) => {
      // Code block
      if (line.startsWith('```')) {
        flushList(i);
        if (inCodeBlock) {
          elements.push(
            <pre key={i} className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto my-8 text-sm border border-gray-700">
              <code>{codeContent.trim()}</code>
            </pre>
          );
          codeContent = '';
        }
        inCodeBlock = !inCodeBlock;
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      // Table detection
      if (line.includes('|') && !line.startsWith('![') && !line.startsWith('>')) {
        if (!inTable) {
          flushList(i);
          inTable = true;
          tableRows = [];
        }
        tableRows.push(line);
        return;
      } else if (inTable) {
        const tableElement = renderTable(tableRows, i);
        if (tableElement) elements.push(tableElement);
        inTable = false;
        tableRows = [];
      }

      // Image
      if (line.startsWith('![')) {
        flushList(i);
        const match = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          elements.push(
            <figure key={i} className="my-10">
              <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={match[2]}
                  alt={match[1]}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {match[1] && (
                <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
                  {match[1]}
                </figcaption>
              )}
            </figure>
          );
        }
        return;
      }

      // H1
      if (line.startsWith('# ') && !line.startsWith('## ')) {
        flushList(i);
        elements.push(
          <h1 key={i} className="text-3xl sm:text-4xl font-bold mt-8 mb-6 text-gray-900 dark:text-gray-100 leading-tight">
            {line.replace('# ', '')}
          </h1>
        );
        return;
      }

      // H2
      if (line.startsWith('## ')) {
        flushList(i);
        elements.push(
          <h2 key={i} className="text-2xl sm:text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-3">
            {line.replace('## ', '')}
          </h2>
        );
        return;
      }

      // H3
      if (line.startsWith('### ')) {
        flushList(i);
        elements.push(
          <h3 key={i} className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Blockquote - styled as inspirational quote
      if (line.startsWith('> ')) {
        flushList(i);
        const quoteText = line.replace('> ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
        elements.push(
          <blockquote
            key={i}
            className="relative my-10 py-6 px-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border-l-4 border-blue-500"
          >
            <span className="absolute -top-3 -left-2 text-6xl text-blue-300 dark:text-blue-700 font-serif">&ldquo;</span>
            <p className="text-lg italic text-gray-700 dark:text-gray-300 relative z-10" dangerouslySetInnerHTML={{ __html: quoteText }} />
          </blockquote>
        );
        return;
      }

      // Unordered list
      if (line.startsWith('- ')) {
        if (!inList || listType !== 'ul') {
          flushList(i);
          inList = true;
          listType = 'ul';
        }
        const itemText = line
          .replace('- ', '')
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
        listItems.push(
          <li key={`item-${i}`} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: itemText }} />
        );
        return;
      }

      // Ordered list
      if (/^\d+\.\s/.test(line)) {
        if (!inList || listType !== 'ol') {
          flushList(i);
          inList = true;
          listType = 'ol';
        }
        const itemText = line
          .replace(/^\d+\.\s/, '')
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
        listItems.push(
          <li key={`item-${i}`} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: itemText }} />
        );
        return;
      }

      // HR
      if (line.startsWith('---')) {
        flushList(i);
        elements.push(
          <hr key={i} className="my-12 border-gray-200 dark:border-gray-800" />
        );
        return;
      }

      // Paragraph
      if (line.trim()) {
        flushList(i);
        const processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white font-semibold">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');
        elements.push(
          <p
            key={i}
            className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      }
    });

    // Flush remaining items
    flushList(lines.length);

    // Handle remaining table
    if (inTable && tableRows.length > 0) {
      const tableElement = renderTable(tableRows, lines.length + 1);
      if (tableElement) elements.push(tableElement);
    }

    return elements;
  };

  return (
    <div className="min-h-screen gradient-bg py-20 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft size={20} />
            {t('title')}
          </Link>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-xl"
        >
          <Image
            src={post.image}
            alt={post.title[locale]}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
              >
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 leading-tight">
            {post.title[locale]}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <User size={18} />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(post.date).toLocaleDateString(
                locale === 'vi' ? 'vi-VN' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} />
              {post.readTime} {t('minRead')}
            </span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 md:p-12 mb-12"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {renderContent(post.content[locale])}
          </div>
        </motion.div>

        {/* Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4"
        >
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Share2 size={18} />
            {t('share')}:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleShare('twitter')}
              className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-500 rounded-lg transition-colors"
            >
              <Twitter size={20} />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
            >
              <Linkedin size={20} />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className={`p-3 rounded-lg transition-colors ${
                copied
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <LinkIcon size={20} />
            </button>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
