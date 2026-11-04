// خدمة الإشعارات للوحة الإدارة — الوفاء المتميز
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(list){
    for(var i=0;i<list.length;i++){if(/#admin/.test(list[i].url)&&'focus' in list[i])return list[i].focus()}
    return self.clients.openWindow('./#admin');
  }));
});

// يجعل الموقع قابلاً للتثبيت كتطبيق بزر واحد على أندرويد (يجلب الصفحة من الإنترنت دائماً، بدون نسخ قديمة)
self.addEventListener('fetch',function(e){
  if(e.request.mode!=='navigate')return;
  e.respondWith(fetch(e.request).catch(function(){return new Response('<meta charset="utf-8"><p style="font:18px Tahoma;text-align:center;margin-top:40vh" dir="rtl">لا يوجد اتصال بالإنترنت. حاول مرة أخرى.</p>',{headers:{'Content-Type':'text/html; charset=utf-8'}})}));
});
