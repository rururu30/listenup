window.LISTENING_DATA = {
  "schemaVersion": 1,
  "weekLabel": "2026年11月9日〜13日（11月第2週）",
  "days": [
    {
      "day": "mon",
      "isDummy": false,
      "sections": [
        {
          "id": "mon-1",
          "number": 1,
          "type": "word",
          "title": "単語を選ぶ",
          "instruction": "短い会話と質問を聞いて、最も適切な英単語を選びましょう。",
          "questions": [
            {
              "id": "mon-1-1",
              "lines": [
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "I checked this report three times, but I still can’t find the mistake.",
                  "ja": "この報告書を3回見直したのに、まだ間違いが見つからないんだ。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Take a break and look at it again after lunch.",
                  "ja": "少し休んで、昼食のあとにもう一度見てみたら？"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Maybe. My eyes are tired, and nothing makes sense anymore.",
                  "ja": "そうかもね。目が疲れて、もう何も頭に入ってこないよ。"
                }
              ],
              "question": {
                "text": "How does the man feel?",
                "ja": "男性はどう感じていますか。"
              },
              "choices": [
                {
                  "text": "relaxed",
                  "ja": "くつろいでいる"
                },
                {
                  "text": "frustrated",
                  "ja": "いらだっている"
                },
                {
                  "text": "proud",
                  "ja": "誇らしい"
                },
                {
                  "text": "curious",
                  "ja": "好奇心がある"
                }
              ],
              "answer": 1,
              "explanation": "何度確認しても間違いが見つからず、疲れて何も頭に入らないと言っています。その気持ちを表すのは frustrated（いらだっている）です。この単語は音声には出てきません。"
            },
            {
              "id": "mon-1-2",
              "lines": [
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "These two sofas look almost the same, but the gray one costs fifty dollars more.",
                  "ja": "この2つのソファはほとんど同じに見えるけれど、グレーのほうが50ドル高いわ。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "It has a cover that you can wash in a machine, though.",
                  "ja": "でも、そっちは洗濯機で洗えるカバーが付いているよ。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "That’s true. I have two cats, so that matters a lot.",
                  "ja": "確かにそうね。猫を2匹飼っているから、それはとても大事だわ。"
                }
              ],
              "question": {
                "text": "What matters most to the woman?",
                "ja": "女性にとって最も大切なことは何ですか。"
              },
              "choices": [
                {
                  "text": "price",
                  "ja": "値段"
                },
                {
                  "text": "color",
                  "ja": "色"
                },
                {
                  "text": "delivery",
                  "ja": "配達"
                },
                {
                  "text": "pets",
                  "ja": "ペット"
                }
              ],
              "answer": 3,
              "explanation": "洗えるカバーの話を聞いて、「猫を2匹飼っているので大事」と答えています。cats を言い換えた pets が正解です。値段の差は出ますが、決め手ではありません。"
            },
            {
              "id": "mon-1-3",
              "lines": [
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Did you hand in your essay yet?",
                  "ja": "もう作文は提出した？"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "Not yet. It’s due tomorrow, and I haven’t even written the conclusion.",
                  "ja": "まだだよ。明日が締め切りで、結論もまだ書いていないんだ。"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Then stop talking to me and go write it!",
                  "ja": "だったら、僕と話していないで書きに行きなよ！"
                }
              ],
              "question": {
                "text": "What are the two speakers mainly talking about?",
                "ja": "2人は主に何について話していますか。"
              },
              "choices": [
                {
                  "text": "assignment",
                  "ja": "課題"
                },
                {
                  "text": "vacation",
                  "ja": "休暇"
                },
                {
                  "text": "exam",
                  "ja": "試験"
                },
                {
                  "text": "lecture",
                  "ja": "講義"
                }
              ],
              "answer": 0,
              "explanation": "提出（hand in）・締め切り・結論という言葉から、書く課題の話だとわかります。essay を言い換えた assignment が正解です。"
            }
          ]
        },
        {
          "id": "mon-2",
          "number": 2,
          "type": "conversation",
          "questions": [
            {
              "id": "mon-2-1",
              "lines": [
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "I can’t decide between these two headphones. The red pair is thirty dollars cheaper.",
                  "ja": "このヘッドホン2つで迷っているの。赤いほうが30ドル安いのよ。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "But the black pair blocks outside noise. That’s important on the train.",
                  "ja": "でも黒いほうは周りの音を遮るよ。電車の中では大事だよ。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "I know, but I mostly use them at home, and the red pair is lighter.",
                  "ja": "わかっているけれど、ほとんど家で使うし、赤いほうが軽いの。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Then the cheaper pair makes sense. You could use the extra money for a case.",
                  "ja": "それなら安いほうで良さそうだね。浮いたお金でケースを買えるよ。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Good idea. I’ll take the red ones.",
                  "ja": "いい考えね。赤いのにするわ。"
                }
              ],
              "question": {
                "text": "What will the woman probably do?",
                "ja": "女性はおそらく何をしますか。"
              },
              "choices": [
                {
                  "text": "Buy the black pair for travel.",
                  "ja": "旅行用に黒いヘッドホンを買う。"
                },
                {
                  "text": "Buy both pairs and compare them at home.",
                  "ja": "両方買って家で比べる。"
                },
                {
                  "text": "Buy the red pair and a case.",
                  "ja": "赤いヘッドホンとケースを買う。"
                },
                {
                  "text": "Wait until the black pair costs less.",
                  "ja": "黒いヘッドホンが安くなるまで待つ。"
                }
              ],
              "answer": 2,
              "explanation": "女性は家で主に使うことと軽さから赤い方を選び、男性の「浮いたお金でケースを」という提案にも賛成しています。"
            },
            {
              "id": "mon-2-2",
              "lines": [
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "Do you have a minute? I have a dentist appointment on Friday afternoon, and I can’t change it.",
                  "ja": "ちょっといい？金曜の午後に歯医者の予約があって、変えられないの。"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "Do you want me to take your afternoon shift?",
                  "ja": "私があなたの午後のシフトを代わりましょうか。"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "Yes, please. I’d work your Saturday morning shift in exchange.",
                  "ja": "ええ、お願い。そのかわり、あなたの土曜の朝のシフトに入るわ。"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "That would be great. A relative is visiting, and I wanted the whole weekend free. But will the manager allow it?",
                  "ja": "それは助かる。親戚が来るから、週末は丸ごと空けたかったの。でも店長は許してくれるかな。"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "I already asked. The manager said it’s fine if we both sign the new schedule.",
                  "ja": "もう聞いたわ。2人でシフト表に署名すれば大丈夫だって。"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "Then let’s do it right now.",
                  "ja": "じゃあ、今すぐやりましょう。"
                }
              ],
              "question": {
                "text": "What will the speakers do next?",
                "ja": "2人は次に何をしますか。"
              },
              "choices": [
                {
                  "text": "Ask the manager for permission.",
                  "ja": "店長に許可をもらう。"
                },
                {
                  "text": "Book a dentist appointment.",
                  "ja": "歯医者の予約を取る。"
                },
                {
                  "text": "Prepare for a visit from a relative.",
                  "ja": "親戚の訪問の準備をする。"
                },
                {
                  "text": "Sign the changed schedule.",
                  "ja": "変更したシフト表に署名する。"
                }
              ],
              "answer": 3,
              "explanation": "店長への確認はすでに済んでおり、「2人で署名すればよい」と言われています。最後に「今すぐやろう」と言っているので、次の行動はシフト表への署名です。"
            }
          ]
        },
        {
          "id": "mon-3",
          "number": 3,
          "type": "talk",
          "questions": [
            {
              "id": "mon-3-1",
              "lines": [
                {
                  "speaker": "Announcer",
                  "gender": "female",
                  "text": "Good evening, everyone. This is a message from Harbor Swimming Center. Starting next Monday, the main pool will be closed for two weeks while workers replace the floor tiles. During this time, the smaller training pool will stay open, but it will be limited to lap swimming. Children’s lessons will move to the pool at Eastgate School, and a free bus will leave from our front entrance thirty minutes before each lesson. If you cannot attend the lessons at the new place, please speak to the front desk by Friday, and you may receive a refund for the classes you miss. Thank you for your patience.",
                  "ja": "皆さま、こんばんは。ハーバー・スイミングセンターからのお知らせです。来週の月曜日から2週間、作業員が床のタイルを張り替えるため、メインプールは閉鎖されます。この間、小さいほうのトレーニング用プールは利用できますが、ラップ泳ぎ専用になります。子ども向けのレッスンはイーストゲート校のプールに移り、各レッスンの30分前に正面入口から無料バスが出ます。新しい場所でのレッスンに参加できない場合は、金曜日までに受付にお申し出ください。欠席する授業の返金を受けられる場合があります。ご理解のほど、よろしくお願いいたします。"
                }
              ],
              "question": {
                "text": "What will happen to children’s swimming lessons?",
                "ja": "子ども向けの水泳レッスンはどうなりますか。"
              },
              "choices": [
                {
                  "text": "They will be canceled for two weeks.",
                  "ja": "2週間中止になる。"
                },
                {
                  "text": "They will be held at a school pool.",
                  "ja": "学校のプールで行われる。"
                },
                {
                  "text": "They will use the smaller training pool.",
                  "ja": "小さいトレーニング用プールを使う。"
                },
                {
                  "text": "They will start thirty minutes earlier.",
                  "ja": "30分早く始まる。"
                }
              ],
              "answer": 1,
              "explanation": "子ども向けレッスンはイーストゲート校のプールに移ります。小さいプールはラップ泳ぎ専用、30分というのは無料バスが出る時間です。"
            },
            {
              "id": "mon-3-2",
              "lines": [
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Thank you for seeing me. I got two job offers for the spring, and I can’t decide.",
                  "ja": "お時間をいただきありがとうございます。春に向けて仕事を2つ誘われていて、決められないんです。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Congratulations! What are they?",
                  "ja": "おめでとう！どんな仕事なの？"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "One is at a bookstore near campus. It pays eleven dollars an hour, and I would work only on weekends. The other is at a call center. It pays fifteen dollars, but I’d work three weeknights.",
                  "ja": "1つは大学の近くの書店で、時給は11ドル、働くのは週末だけです。もう1つはコールセンターで、時給は15ドルですが、平日の夜に3日働きます。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Your classes get harder in the spring, don’t they?",
                  "ja": "春は授業が難しくなるのよね？"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Yes. I have a lab course on Tuesday evenings. But the extra money would help with my tuition.",
                  "ja": "はい。火曜の夜に実験の授業があります。でも、多く稼げれば学費の助けになります。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Weeknights would leave you less time to study, though. Why not ask the call center whether you could work only on weekends? If they say no, take the bookstore job.",
                  "ja": "でも平日の夜だと勉強する時間が減るわよ。コールセンターに週末だけ働けないか聞いてみたら？だめなら書店の仕事にしなさい。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "That’s a good plan. I’ll send them an email today.",
                  "ja": "いい計画ですね。今日メールを送ります。"
                }
              ],
              "question": {
                "text": "What does the woman suggest the man do?",
                "ja": "女性は男性に何をするよう提案していますか。"
              },
              "choices": [
                {
                  "text": "Change the day of his lab course.",
                  "ja": "実験の授業の曜日を変える。"
                },
                {
                  "text": "Take both jobs for a month.",
                  "ja": "1か月間、両方の仕事をする。"
                },
                {
                  "text": "Ask the call center about weekend work.",
                  "ja": "コールセンターに週末の勤務について尋ねる。"
                },
                {
                  "text": "Apply to a different bookstore.",
                  "ja": "別の書店に応募する。"
                }
              ],
              "answer": 2,
              "explanation": "女性は「コールセンターに週末だけ働けるか聞き、だめなら書店の仕事に」と提案しています。男性もその案に賛成し、メールを送ると言っています。"
            }
          ]
        }
      ]
    },
    {
      "day": "tue",
      "isDummy": false,
      "sections": [
        {
          "id": "tue-1",
          "number": 1,
          "type": "word",
          "title": "単語を選ぶ",
          "instruction": "短い会話と質問を聞いて、最も適切な英単語を選びましょう。",
          "questions": [
            {
              "id": "tue-1-1",
              "lines": [
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "I’m sorry, sir. Your flight to Sapporo will leave two hours late because of strong winds.",
                  "ja": "申し訳ございません、お客様。強風のため、札幌行きの便は2時間遅れて出発します。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Two hours? My sister is meeting me at the airport.",
                  "ja": "2時間ですか？姉が空港で迎えてくれる予定なんです。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "You can wait in the lounge. I’ll let you know when boarding starts.",
                  "ja": "ラウンジでお待ちいただけます。搭乗が始まったらお知らせします。"
                }
              ],
              "question": {
                "text": "Why will the man’s flight be late?",
                "ja": "男性の飛行機はなぜ遅れますか。"
              },
              "choices": [
                {
                  "text": "maintenance",
                  "ja": "整備"
                },
                {
                  "text": "staffing",
                  "ja": "人手不足"
                },
                {
                  "text": "weather",
                  "ja": "天気"
                },
                {
                  "text": "security",
                  "ja": "保安検査"
                }
              ],
              "answer": 2,
              "explanation": "遅れの理由は「強風」です。これを一語でまとめた weather（天気）が正解です。weather という単語は音声には出てきません。"
            },
            {
              "id": "tue-1-2",
              "lines": [
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "You’ve been coughing all week. Have you seen a doctor?",
                  "ja": "1週間ずっと咳をしているわね。お医者さんには行った？"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "Not yet. I think it will go away if I drink hot tea and sleep early.",
                  "ja": "まだよ。温かいお茶を飲んで早く寝れば治ると思って。"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "Please make an appointment today. It’s better to be safe.",
                  "ja": "今日、予約を取ってね。念のためにそのほうがいいわ。"
                }
              ],
              "question": {
                "text": "How does the first speaker feel about the second speaker’s health?",
                "ja": "最初の話者は、もう一方の話者の健康についてどう感じていますか。"
              },
              "choices": [
                {
                  "text": "concerned",
                  "ja": "心配している"
                },
                {
                  "text": "amused",
                  "ja": "面白がっている"
                },
                {
                  "text": "embarrassed",
                  "ja": "恥ずかしがっている"
                },
                {
                  "text": "confident",
                  "ja": "自信がある"
                }
              ],
              "answer": 0,
              "explanation": "1週間続く咳を気にかけ、「念のため今日予約を」と勧めています。心配している様子を表す concerned が正解です。"
            },
            {
              "id": "tue-1-3",
              "lines": [
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Oh, you’re here about the washing machine?",
                  "ja": "ああ、洗濯機の件でいらしたのですか。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Yes. The repair company sent me. I’ll check the pump, but I may need to order a new part.",
                  "ja": "はい。修理会社から来ました。ポンプを確認しますが、新しい部品を注文する必要があるかもしれません。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "How long will that take?",
                  "ja": "どのくらいかかりますか。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "If I need one, I’ll come back on Thursday with it.",
                  "ja": "必要なら、木曜日に部品を持ってまた来ます。"
                }
              ],
              "question": {
                "text": "What is the man’s job?",
                "ja": "男性の仕事は何ですか。"
              },
              "choices": [
                {
                  "text": "landlord",
                  "ja": "大家"
                },
                {
                  "text": "technician",
                  "ja": "技術者"
                },
                {
                  "text": "cashier",
                  "ja": "レジ係"
                },
                {
                  "text": "driver",
                  "ja": "運転手"
                }
              ],
              "answer": 1,
              "explanation": "修理会社から来て、洗濯機のポンプを調べ、部品を注文すると言っています。この仕事を表す語は technician（技術者）です。"
            }
          ]
        },
        {
          "id": "tue-2",
          "number": 2,
          "type": "conversation",
          "questions": [
            {
              "id": "tue-2-1",
              "lines": [
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Where’s the key to the music room? Practice starts in ten minutes.",
                  "ja": "音楽室の鍵はどこ？練習は10分後に始まるよ。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "I thought you had it. Mr. Ito gave it to you on Monday.",
                  "ja": "君が持っているんだと思っていた。伊藤先生が月曜日に君に渡したよね。"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "He did, but I think I left it in my jacket, and the jacket is at home.",
                  "ja": "そうなんだけど、上着に入れたままで、その上着は家にあると思う。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "How long would it take to go and get it?",
                  "ja": "取りに行ったらどのくらいかかる？"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "About twenty minutes by bike, so I’d be late.",
                  "ja": "自転車で20分くらいだから、遅れてしまうよ。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "Let’s ask the office instead. They keep a spare key for emergencies.",
                  "ja": "かわりに事務室に聞こう。緊急用の予備の鍵を持っているよ。"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Good thinking. I’ll go now.",
                  "ja": "いい考えだね。今から行ってくる。"
                }
              ],
              "question": {
                "text": "What will the first speaker do next?",
                "ja": "最初の話者は次に何をしますか。"
              },
              "choices": [
                {
                  "text": "Ride home to get the jacket.",
                  "ja": "上着を取りに自転車で家へ戻る。"
                },
                {
                  "text": "Call a teacher about the practice.",
                  "ja": "練習について先生に電話する。"
                },
                {
                  "text": "Cancel today’s practice.",
                  "ja": "今日の練習を中止する。"
                },
                {
                  "text": "Ask the office for another key.",
                  "ja": "事務室に別の鍵をお願いする。"
                }
              ],
              "answer": 3,
              "explanation": "自転車で家に戻ると20分かかるので、もう一方の話者が「事務室に予備の鍵を借りよう」と提案し、最初の話者が「今から行く」と答えています。"
            },
            {
              "id": "tue-2-2",
              "lines": [
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Hello, I’m calling about the airport shuttle. I’d like to book a ride for Saturday morning.",
                  "ja": "もしもし、空港シャトルの件でお電話しました。土曜の朝の便を予約したいのですが。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Certainly. What time does your flight leave?",
                  "ja": "かしこまりました。飛行機は何時に出ますか。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "At ten forty. I’m staying near Central Park.",
                  "ja": "10時40分です。セントラルパークの近くに泊まっています。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Then I recommend the seven o’clock shuttle. The trip takes about fifty minutes, and traffic is heavy on Saturdays.",
                  "ja": "それでしたら7時のシャトルをお勧めします。所要時間は約50分で、土曜は道が混みます。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "That’s earlier than I expected. Is there a later one?",
                  "ja": "思ったより早いですね。もっと遅いのはありますか。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "The eight o’clock is possible, but the airport will be crowded, and you may have to hurry.",
                  "ja": "8時のでも可能ですが、空港が混んでいて、急ぐことになるかもしれません。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "I’ll take the seven o’clock one, then.",
                  "ja": "では、7時のにします。"
                }
              ],
              "question": {
                "text": "Why does the man choose the seven o’clock shuttle?",
                "ja": "男性はなぜ7時のシャトルを選びますか。"
              },
              "choices": [
                {
                  "text": "It is cheaper than the later one.",
                  "ja": "遅いほうより安いから。"
                },
                {
                  "text": "He wants to avoid hurrying at the airport.",
                  "ja": "空港で急ぎたくないから。"
                },
                {
                  "text": "His hotel is far from the airport.",
                  "ja": "ホテルが空港から遠いから。"
                },
                {
                  "text": "The later shuttle is full.",
                  "ja": "遅いほうのシャトルは満席だから。"
                }
              ],
              "answer": 1,
              "explanation": "8時のシャトルでも可能ですが、空港が混んで急ぐことになるかもしれないと言われ、余裕を持てる7時のほうを選んでいます。料金や満席の話は出ていません。"
            }
          ]
        },
        {
          "id": "tue-3",
          "number": 3,
          "type": "talk",
          "questions": [
            {
              "id": "tue-3-1",
              "lines": [
                {
                  "speaker": "Teacher",
                  "gender": "male",
                  "text": "Today I’d like to explain how we will make recycled paper in art class next week. First, we will collect used paper from the school offices and tear it into small pieces. Then we will soak the pieces in warm water overnight. The next day, you will mix them into a soft pulp and spread it thinly on a screen. Because the paper is wet, it must dry for two days before you can write on it. Some of you may want to add dried flowers for decoration, and that is fine. However, please do not add anything thick, because the paper might crack. Finally, please bring an old towel on Monday. We will use it to press out the water.",
                  "ja": "今日は、来週の美術の授業で再生紙をどう作るかを説明します。まず、学校の事務室から出た使用済みの紙を集め、小さくちぎります。次に、そのかけらをぬるま湯に一晩つけます。翌日、それを混ぜて柔らかいパルプにし、網の上に薄く広げます。紙は濡れているので、字を書けるようになるまで2日間乾かす必要があります。飾りとして押し花を加えたい人もいるでしょう。それは構いません。ただし、紙が割れるかもしれないので、厚みのあるものは入れないでください。最後に、月曜日には古いタオルを持ってきてください。水を押し出すのに使います。"
                }
              ],
              "question": {
                "text": "Why does the teacher say students should not add anything thick?",
                "ja": "先生はなぜ、厚みのあるものを加えてはいけないと言っていますか。"
              },
              "choices": [
                {
                  "text": "The paper might crack.",
                  "ja": "紙が割れるかもしれないから。"
                },
                {
                  "text": "The pulp would not become soft.",
                  "ja": "パルプが柔らかくならないから。"
                },
                {
                  "text": "The screen could break.",
                  "ja": "網が壊れるかもしれないから。"
                },
                {
                  "text": "The paper would need more water.",
                  "ja": "紙にもっと水が必要になるから。"
                }
              ],
              "answer": 0,
              "explanation": "先生は「紙が割れるかもしれないので、厚みのあるものは入れないで」と言っています。"
            },
            {
              "id": "tue-3-2",
              "lines": [
                {
                  "speaker": "Announcer",
                  "gender": "female",
                  "text": "Attention, passengers of Blue Bay Ferry. Because of rough seas, all ferries to Tsuki Island before noon tomorrow have been canceled. The first ferry will leave at twelve thirty if the weather improves. Passengers who already have tickets do not need to do anything, because they can use them on any ferry within the next thirty days. Those who prefer not to travel may receive a full refund at the ticket office, but the office closes at six o’clock tonight. For updates, please check our website or call the number on your ticket. We are very sorry for the trouble this causes, and we thank you for your understanding.",
                  "ja": "ブルーベイ・フェリーをご利用の皆さまにお知らせします。海が荒れているため、明日の正午より前の月島行きのフェリーはすべて欠航となりました。天候が回復すれば、最初の便は12時30分に出発します。すでにチケットをお持ちの方は、何もする必要はありません。今後30日以内であればどの便でもお使いいただけます。旅行をおやめになる方は、窓口で全額の払い戻しを受けられますが、窓口は今夜6時に閉まります。最新情報はウェブサイトをご確認いただくか、チケットに記載の番号へお電話ください。ご迷惑をおかけして申し訳ございません。ご理解に感謝いたします。"
                }
              ],
              "question": {
                "text": "What should passengers do if they want a refund?",
                "ja": "払い戻しを希望する乗客はどうすべきですか。"
              },
              "choices": [
                {
                  "text": "Call the number on their ticket tomorrow morning.",
                  "ja": "明日の朝、チケットに記載の番号へ電話する。"
                },
                {
                  "text": "Check the website for new tickets.",
                  "ja": "新しいチケットについてウェブサイトを確認する。"
                },
                {
                  "text": "Go to the ticket office before six tonight.",
                  "ja": "今夜6時までに窓口へ行く。"
                },
                {
                  "text": "Wait for the twelve thirty ferry.",
                  "ja": "12時30分の便を待つ。"
                }
              ],
              "answer": 2,
              "explanation": "払い戻しは窓口で受けられますが、窓口は今夜6時に閉まります。電話やウェブサイトは最新情報の確認のためのものです。"
            }
          ]
        }
      ]
    },
    {
      "day": "wed",
      "isDummy": false,
      "sections": [
        {
          "id": "wed-1",
          "number": 1,
          "type": "word",
          "title": "単語を選ぶ",
          "instruction": "短い会話と質問を聞いて、最も適切な英単語を選びましょう。",
          "questions": [
            {
              "id": "wed-1-1",
              "lines": [
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Take one tablet after each meal, and don’t drink coffee with it.",
                  "ja": "毎食後に錠剤を1錠飲んでください。コーヒーと一緒に飲まないでくださいね。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Thanks. Could I also get a receipt for my insurance?",
                  "ja": "ありがとう。保険のために領収書ももらえますか。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Of course. Just a moment.",
                  "ja": "もちろんです。少々お待ちください。"
                }
              ],
              "question": {
                "text": "Where are the speakers?",
                "ja": "2人はどこにいますか。"
              },
              "choices": [
                {
                  "text": "pharmacy",
                  "ja": "薬局"
                },
                {
                  "text": "bakery",
                  "ja": "パン屋"
                },
                {
                  "text": "stadium",
                  "ja": "競技場"
                },
                {
                  "text": "bank",
                  "ja": "銀行"
                }
              ],
              "answer": 0,
              "explanation": "薬の飲み方を説明する場面で、保険のための領収書も頼んでいます。薬局（pharmacy）にいるとわかります。"
            },
            {
              "id": "wed-1-2",
              "lines": [
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "You look worried. Is something wrong?",
                  "ja": "心配そうな顔ね。何かあったの？"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "My phone is dead, and I forgot to bring the cable. Do you have one I can use?",
                  "ja": "携帯の電池が切れて、ケーブルも忘れたの。使えるのを持っている？"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "Sure. I think there’s one in my bag.",
                  "ja": "ええ。かばんに入っていると思うわ。"
                }
              ],
              "question": {
                "text": "What does the second speaker need?",
                "ja": "2番目の話者は何を必要としていますか。"
              },
              "choices": [
                {
                  "text": "umbrella",
                  "ja": "傘"
                },
                {
                  "text": "calculator",
                  "ja": "電卓"
                },
                {
                  "text": "charger",
                  "ja": "充電器"
                },
                {
                  "text": "notebook",
                  "ja": "ノート"
                }
              ],
              "answer": 2,
              "explanation": "電池が切れた携帯のためにケーブルを借りたがっています。必要なのは充電器（charger）です。charger は音声には出てきません。"
            },
            {
              "id": "wed-1-3",
              "lines": [
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Did you enjoy your trip to Kyoto?",
                  "ja": "京都旅行は楽しかった？"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Yes, it was wonderful, but I walked so much that my legs still hurt.",
                  "ja": "うん、素晴らしかったよ。でも歩きすぎて、まだ足が痛いんだ。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "You should rest this weekend.",
                  "ja": "今週末は休んだほうがいいわね。"
                }
              ],
              "question": {
                "text": "How does the man’s body feel now?",
                "ja": "男性の体は今どんな感じですか。"
              },
              "choices": [
                {
                  "text": "cold",
                  "ja": "寒い"
                },
                {
                  "text": "hungry",
                  "ja": "空腹だ"
                },
                {
                  "text": "dizzy",
                  "ja": "めまいがする"
                },
                {
                  "text": "sore",
                  "ja": "痛む"
                }
              ],
              "answer": 3,
              "explanation": "歩きすぎて足がまだ痛むと言っています。その状態を表すのは sore（痛む）です。"
            }
          ]
        },
        {
          "id": "wed-2",
          "number": 2,
          "type": "conversation",
          "questions": [
            {
              "id": "wed-2-1",
              "lines": [
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "I’ve been waking up at night lately, and I feel tired all day.",
                  "ja": "最近、夜中に目が覚めて、一日中だるいの。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Do you drink coffee in the evening?",
                  "ja": "夜にコーヒーを飲む？"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Only one cup after dinner.",
                  "ja": "夕食後に1杯だけよ。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "That could be the reason. Caffeine stays in your body for many hours. Try warm milk or water instead for a week.",
                  "ja": "それが原因かもしれないよ。カフェインは何時間も体に残るんだ。1週間、かわりに温かい牛乳か水を飲んでみて。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "I’ll try that. Should I also see a doctor?",
                  "ja": "やってみるわ。お医者さんにも行ったほうがいい？"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "If it doesn’t get better after two weeks, yes.",
                  "ja": "2週間たってもよくならなければ、行ったほうがいいね。"
                }
              ],
              "question": {
                "text": "What does the man suggest the woman do first?",
                "ja": "男性は女性にまず何をするよう勧めていますか。"
              },
              "choices": [
                {
                  "text": "See a doctor right away.",
                  "ja": "すぐに医者にかかる。"
                },
                {
                  "text": "Stop drinking coffee after dinner.",
                  "ja": "夕食後にコーヒーを飲むのをやめる。"
                },
                {
                  "text": "Sleep longer in the morning.",
                  "ja": "朝、長く寝る。"
                },
                {
                  "text": "Exercise before bed.",
                  "ja": "寝る前に運動する。"
                }
              ],
              "answer": 1,
              "explanation": "男性はカフェインが原因かもしれないと考え、まず1週間、夜のコーヒーをやめるよう勧めています。医者に行くのは2週間たってもよくならない場合です。"
            },
            {
              "id": "wed-2-2",
              "lines": [
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "Excuse me. Someone keeps parking in front of my driveway, and I can’t get my car out.",
                  "ja": "ちょっと聞いて。誰かがうちの車道の前にいつも車を止めていて、車が出せないの。"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "I think it’s the new neighbor in the yellow house. Have you spoken to them?",
                  "ja": "黄色い家の新しい隣人だと思うわ。話してみた？"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "Not yet. I don’t want to start an argument.",
                  "ja": "まだよ。言い争いにはしたくなくて。"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "Why not leave a polite note on the windshield first? Most people don’t realize it’s a problem.",
                  "ja": "まず、フロントガラスに丁寧なメモを置いたら？たいていの人は迷惑だと気づいていないのよ。"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "Good idea. If it happens again, I’ll call the building manager.",
                  "ja": "いい考えね。もしまたあったら、管理人に電話するわ。"
                }
              ],
              "question": {
                "text": "What does the second speaker suggest?",
                "ja": "2番目の話者は何を提案していますか。"
              },
              "choices": [
                {
                  "text": "Leaving a polite note on the car.",
                  "ja": "車に丁寧なメモを残すこと。"
                },
                {
                  "text": "Calling the building manager now.",
                  "ja": "今すぐ管理人に電話すること。"
                },
                {
                  "text": "Parking in a different place.",
                  "ja": "別の場所に車を止めること。"
                },
                {
                  "text": "Speaking to the neighbor’s landlord.",
                  "ja": "隣人の大家に話すこと。"
                }
              ],
              "answer": 0,
              "explanation": "2番目の話者は、まずフロントガラスに丁寧なメモを置くことを提案しています。管理人に電話するのは、また起きたときに最初の話者が考えていることです。"
            }
          ]
        },
        {
          "id": "wed-3",
          "number": 3,
          "type": "talk",
          "questions": [
            {
              "id": "wed-3-1",
              "lines": [
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Hi, I joined the gym last month, but I’m not seeing any change. Could you give me some advice?",
                  "ja": "こんにちは。先月ジムに入会したのですが、変化が見られません。アドバイスをいただけますか。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Sure. How many times a week do you come?",
                  "ja": "もちろん。週に何回来ていますか。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Four times. I run on the machine for an hour each time.",
                  "ja": "4回です。毎回1時間、マシンで走っています。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "That’s a lot. What do you eat before you exercise?",
                  "ja": "かなり多いですね。運動の前には何を食べていますか。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Usually nothing. I’m in a hurry in the morning.",
                  "ja": "たいてい何も。朝は急いでいるので。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "That might be the problem. Your body needs energy, and without it you may get tired too quickly.",
                  "ja": "それが問題かもしれません。体にはエネルギーが必要で、それがないとすぐに疲れてしまいます。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "I never thought about that.",
                  "ja": "考えたこともありませんでした。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Try a banana or some yogurt thirty minutes before. Also, I’d reduce your running to forty minutes and add some weight training twice a week.",
                  "ja": "30分前にバナナかヨーグルトを食べてみてください。それと、走るのは40分に減らして、週に2回筋力トレーニングを加えるのがよいでしょう。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Okay. I’ll start with the banana tomorrow.",
                  "ja": "わかりました。明日、バナナから始めます。"
                }
              ],
              "question": {
                "text": "What does the man advise the woman to do?",
                "ja": "男性は女性に何をするよう助言していますか。"
              },
              "choices": [
                {
                  "text": "Come to the gym every day.",
                  "ja": "毎日ジムに来る。"
                },
                {
                  "text": "Run for a longer time.",
                  "ja": "もっと長く走る。"
                },
                {
                  "text": "Skip breakfast to lose weight.",
                  "ja": "体重を減らすため朝食を抜く。"
                },
                {
                  "text": "Eat a light snack before exercising.",
                  "ja": "運動の前に軽い食べ物を取る。"
                }
              ],
              "answer": 3,
              "explanation": "男性は、何も食べずに運動すると疲れやすいと指摘し、30分前にバナナやヨーグルトを食べるよう勧めています。走る時間は逆に減らすよう言っています。"
            },
            {
              "id": "wed-3-2",
              "lines": [
                {
                  "speaker": "Store Announcer",
                  "gender": "male",
                  "text": "Attention, shoppers. Welcome to Maple Market. This weekend only, members of our rewards program will earn double points on every purchase over twenty dollars. If you are not yet a member, you can sign up at the customer service desk near the entrance. It takes only two minutes. Also, starting Monday, plastic bags will no longer be given out at any of our registers. Please bring your own bag, or buy a sturdy paper bag for ten cents. In addition, we have just opened a new bread counter at the back of the store, and all bread is half price until five o’clock today. Thank you for shopping with us.",
                  "ja": "お買い物中の皆さまにお知らせします。メープル・マーケットへようこそ。今週末限り、会員プログラムの会員の方は、20ドルを超えるお買い物でポイントが2倍になります。まだ会員でない方は、入口近くのお客様サービスカウンターでお申し込みいただけます。所要時間はわずか2分です。また、月曜日から、すべてのレジでレジ袋の配布を終了します。ご自分のバッグをお持ちいただくか、丈夫な紙袋を10セントでお買い求めください。さらに、店の奥に新しいパンのコーナーが開店しました。本日は5時まで、すべてのパンが半額です。ご来店ありがとうございます。"
                }
              ],
              "question": {
                "text": "What will change at the store starting Monday?",
                "ja": "月曜日から、この店では何が変わりますか。"
              },
              "choices": [
                {
                  "text": "Points will be doubled for members.",
                  "ja": "会員のポイントが2倍になる。"
                },
                {
                  "text": "The customer service desk will move.",
                  "ja": "お客様サービスカウンターが移動する。"
                },
                {
                  "text": "Plastic bags will not be given out.",
                  "ja": "レジ袋が配られなくなる。"
                },
                {
                  "text": "Bread will be half price.",
                  "ja": "パンが半額になる。"
                }
              ],
              "answer": 2,
              "explanation": "月曜日からレジ袋の配布が終わります。ポイント2倍は今週末限り、パンの半額は本日限りの話です。"
            }
          ]
        }
      ]
    },
    {
      "day": "thu",
      "isDummy": false,
      "sections": [
        {
          "id": "thu-1",
          "number": 1,
          "type": "word",
          "title": "単語を選ぶ",
          "instruction": "短い会話と質問を聞いて、最も適切な英単語を選びましょう。",
          "questions": [
            {
              "id": "thu-1-1",
              "lines": [
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Professor Lee said we can’t use our phones during the test.",
                  "ja": "リー教授は、試験中は携帯を使ってはいけないと言っていたわ。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Not even as a calculator?",
                  "ja": "電卓がわりにも？"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "No. He’ll lend us a simple calculator.",
                  "ja": "だめよ。簡単な電卓を貸してくれるそうよ。"
                }
              ],
              "question": {
                "text": "What are the speakers talking about?",
                "ja": "2人は何について話していますか。"
              },
              "choices": [
                {
                  "text": "tuition",
                  "ja": "学費"
                },
                {
                  "text": "grades",
                  "ja": "成績"
                },
                {
                  "text": "textbook",
                  "ja": "教科書"
                },
                {
                  "text": "rules",
                  "ja": "規則"
                }
              ],
              "answer": 3,
              "explanation": "試験中に携帯を使えるかどうか、電卓は貸してもらえるか、という決まりの話です。答えは rules（規則）です。"
            },
            {
              "id": "thu-1-2",
              "lines": [
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Could you send me the sales numbers by five o’clock?",
                  "ja": "5時までに売上の数字を送ってもらえる？"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "I’m still waiting for the Osaka office to reply.",
                  "ja": "まだ大阪支店の返事を待っているところなの。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Then send what you have now, and add the rest tomorrow.",
                  "ja": "それなら、今ある分を送って、残りは明日加えてよ。"
                }
              ],
              "question": {
                "text": "Which word describes the woman’s sales numbers right now?",
                "ja": "今の女性の売上の数字を表す語はどれですか。"
              },
              "choices": [
                {
                  "text": "incorrect",
                  "ja": "間違った"
                },
                {
                  "text": "incomplete",
                  "ja": "未完成の"
                },
                {
                  "text": "expensive",
                  "ja": "高価な"
                },
                {
                  "text": "outdated",
                  "ja": "古くなった"
                }
              ],
              "answer": 1,
              "explanation": "大阪支店の返事待ちで、「今ある分を送り、残りは明日」と言われているので、数字はまだそろっていません。incomplete（未完成の）が正解です。"
            },
            {
              "id": "thu-1-3",
              "lines": [
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Which phone should I buy: the cheaper one, or the one with the better camera?",
                  "ja": "どっちの携帯を買うべきかな。安いほうか、カメラがいいほうか。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "How often do you take photos?",
                  "ja": "どのくらい写真を撮るの？"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Almost every day, mostly of my dog.",
                  "ja": "ほぼ毎日。ほとんど犬の写真だよ。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "Then spend the extra money.",
                  "ja": "それなら、多めにお金を出しなよ。"
                }
              ],
              "question": {
                "text": "What does the second speaker think is important?",
                "ja": "2番目の話者は何が大切だと考えていますか。"
              },
              "choices": [
                {
                  "text": "price",
                  "ja": "値段"
                },
                {
                  "text": "battery",
                  "ja": "電池"
                },
                {
                  "text": "quality",
                  "ja": "品質"
                },
                {
                  "text": "color",
                  "ja": "色"
                }
              ],
              "answer": 2,
              "explanation": "毎日写真を撮るなら「高くても良いカメラのほうを」と勧めています。大切なのは値段ではなく品質（quality）です。"
            }
          ]
        },
        {
          "id": "thu-2",
          "number": 2,
          "type": "conversation",
          "questions": [
            {
              "id": "thu-2-1",
              "lines": [
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Did you see the email? The client meeting has been moved from Wednesday to Tuesday.",
                  "ja": "メールを見た？取引先との会議が水曜から火曜に移ったよ。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "Tuesday? But our presentation isn’t finished. I still need the sales charts from Mike’s team.",
                  "ja": "火曜？でも発表の準備がまだできていないよ。マイクのチームの売上グラフがまだ必要なんだ。"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "I could finish the charts tonight if you send me the numbers.",
                  "ja": "数字を送ってくれれば、今夜グラフを仕上げられるよ。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "That would help a lot. I’ll send them within an hour, and then I’ll practice the speech.",
                  "ja": "それは助かる。1時間以内に送って、そのあと話す練習をするよ。"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Good. Let’s meet at nine tomorrow morning for a final check.",
                  "ja": "よし。明日の朝9時に会って、最終確認をしよう。"
                }
              ],
              "question": {
                "text": "What will the first speaker do tonight?",
                "ja": "最初の話者は今夜何をしますか。"
              },
              "choices": [
                {
                  "text": "Finish the charts for the presentation.",
                  "ja": "発表用のグラフを仕上げる。"
                },
                {
                  "text": "Practice the speech.",
                  "ja": "話す練習をする。"
                },
                {
                  "text": "Write an email to the client.",
                  "ja": "取引先にメールを書く。"
                },
                {
                  "text": "Ask another team for numbers.",
                  "ja": "別のチームに数字を頼む。"
                }
              ],
              "answer": 0,
              "explanation": "最初の話者は、数字を受け取ってグラフを今夜仕上げると言っています。話す練習をするのは、もう一方の話者です。"
            },
            {
              "id": "thu-2-2",
              "lines": [
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Hello, I ordered a ceramic lamp online, but it arrived with a crack in the base.",
                  "ja": "もしもし、オンラインで陶器のランプを注文したのですが、土台にひびが入った状態で届きました。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "I’m sorry to hear that. Would you like a refund, or should we send you a new one?",
                  "ja": "申し訳ございません。返金をご希望ですか、それとも新しい物をお送りしましょうか。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "I’d like a new one, but I need it before the weekend. My sister’s birthday party is on Saturday.",
                  "ja": "新しい物がいいのですが、週末までに必要です。土曜に妹の誕生日パーティーがあるんです。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Our standard delivery takes four days, so it would arrive on Monday. Express delivery would get it there by Friday, and we can offer that for free this time.",
                  "ja": "通常配送は4日かかるので、月曜に届きます。速達なら金曜までに届きますし、今回は無料でご提供できます。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Oh, that’s very kind of you. Please send it that way.",
                  "ja": "まあ、ご親切にありがとうございます。その方法でお願いします。"
                }
              ],
              "question": {
                "text": "What will the man do?",
                "ja": "男性は何をしますか。"
              },
              "choices": [
                {
                  "text": "Give the woman a refund today.",
                  "ja": "今日、女性に返金する。"
                },
                {
                  "text": "Repair the lamp for free.",
                  "ja": "ランプを無料で修理する。"
                },
                {
                  "text": "Deliver the lamp on Monday.",
                  "ja": "ランプを月曜日に届ける。"
                },
                {
                  "text": "Send a replacement by express delivery.",
                  "ja": "速達で代わりの品を送る。"
                }
              ],
              "answer": 3,
              "explanation": "女性は新しい物を希望し、週末までに必要だと伝えました。男性は今回、速達を無料で提供し、女性もその方法を選んでいます。"
            }
          ]
        },
        {
          "id": "thu-3",
          "number": 3,
          "type": "talk",
          "questions": [
            {
              "id": "thu-3-1",
              "lines": [
                {
                  "speaker": "Manager",
                  "gender": "female",
                  "text": "Welcome to Dalton Printing, everyone. I’m glad you’re joining us. Let me explain a few points about your first week. On Monday, you will receive your security cards at the front desk. On Tuesday and Wednesday, you will attend training sessions about our printing machines, so please wear comfortable shoes, because you will stand most of the time. On Thursday, each of you will visit a different department, and your supervisor will explain what that team does. Lunch is not provided on the first day, but there is a café on the second floor and a small store across the street. If you have any questions, please do not hesitate to ask. We are happy to help.",
                  "ja": "ダルトン印刷へようこそ、皆さん。ご入社を歓迎します。最初の1週間について、いくつか説明します。月曜日には、正面の受付でセキュリティカードを受け取ります。火曜日と水曜日は、印刷機械についての研修を受けます。ほとんど立ったままになるので、歩きやすい靴で来てください。木曜日には、それぞれ別の部署を訪れ、上司がその部署の仕事を説明します。初日は昼食が出ませんが、2階にカフェがあり、通りの向かいに小さな店もあります。質問があれば、遠慮なく聞いてください。喜んでお手伝いします。"
                }
              ],
              "question": {
                "text": "What will new employees do on Thursday?",
                "ja": "新入社員は木曜日に何をしますか。"
              },
              "choices": [
                {
                  "text": "Visit different departments.",
                  "ja": "それぞれ別の部署を訪れる。"
                },
                {
                  "text": "Receive their security cards.",
                  "ja": "セキュリティカードを受け取る。"
                },
                {
                  "text": "Take training about machines.",
                  "ja": "機械についての研修を受ける。"
                },
                {
                  "text": "Have lunch at the company.",
                  "ja": "会社で昼食を取る。"
                }
              ],
              "answer": 1,
              "explanation": "木曜日には、それぞれ別の部署を訪れます。カードの受け取りは月曜日、機械の研修は火曜日と水曜日です。"
            },
            {
              "id": "thu-3-2",
              "lines": [
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Hey, did you read the notice from the neighborhood association about trash collection?",
                  "ja": "ねえ、町内会のごみ収集についてのお知らせは読んだ？"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "I saw it. The collection time is moving from eight o’clock to six thirty in the morning, right?",
                  "ja": "見たよ。収集時間が8時から朝6時30分に変わるんだよね。"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Yes, starting next month. That’s a problem for me. I leave for work at seven, and I don’t get up until six forty-five.",
                  "ja": "うん、来月から。僕には困るんだ。7時に仕事に出るのに、起きるのは6時45分なんだよ。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "Why not put your bags out the night before?",
                  "ja": "前の晩に出しておけば？"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "I can’t. The notice says animals may open the bags. I guess I’ll have to wake up earlier, but I don’t like that idea.",
                  "ja": "それはだめなんだ。動物が袋を開けるかもしれないから、とお知らせに書いてあった。早起きするしかないけど、気が進まないな。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "Well, my apartment is next to the collection point, and I’ll be awake by six anyway. I could put your bags out for you.",
                  "ja": "うちは収集所の隣だし、どうせ6時には起きているよ。君の分も出してあげられるよ。"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Really? That would be a big help. I’ll bring them to your door in the evening.",
                  "ja": "本当に？すごく助かるよ。夜のうちに君の玄関まで持っていくね。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "Fine. Just tie the bags tightly so that animals can’t open them.",
                  "ja": "いいよ。動物に開けられないように、袋をしっかり縛っておいてね。"
                }
              ],
              "question": {
                "text": "How will the first speaker’s trash be put out?",
                "ja": "最初の話者のごみはどうやって出されますか。"
              },
              "choices": [
                {
                  "text": "The second speaker will put it out in the morning.",
                  "ja": "2番目の話者が朝に出す。"
                },
                {
                  "text": "The first speaker will get up earlier.",
                  "ja": "最初の話者が早起きする。"
                },
                {
                  "text": "It will be put out the night before.",
                  "ja": "前の晩に出される。"
                },
                {
                  "text": "The association will change the time again.",
                  "ja": "町内会が時間をもう一度変更する。"
                }
              ],
              "answer": 0,
              "explanation": "2番目の話者が、自分は6時には起きているので代わりに朝出すと申し出て、最初の話者が受け入れています。前の晩に出すのは禁止されており、早起きは「気が進まない」と言っているだけです。"
            }
          ]
        }
      ]
    },
    {
      "day": "fri",
      "isDummy": false,
      "sections": [
        {
          "id": "fri-1",
          "number": 1,
          "type": "word",
          "title": "単語を選ぶ",
          "instruction": "短い会話と質問を聞いて、最も適切な英単語を選びましょう。",
          "questions": [
            {
              "id": "fri-1-1",
              "lines": [
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Excuse me, this suitcase isn’t mine. Mine is blue with a yellow ribbon on the handle.",
                  "ja": "すみません、このスーツケースは私のではありません。私のは青で、取っ手に黄色いリボンが付いています。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "I’m sorry about that. Let me check the other belt.",
                  "ja": "申し訳ありません。別のベルトコンベアを確認します。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Thank you. I’ve been waiting here for twenty minutes.",
                  "ja": "ありがとう。ここで20分待っているんです。"
                }
              ],
              "question": {
                "text": "What is the woman looking for?",
                "ja": "女性は何を探していますか。"
              },
              "choices": [
                {
                  "text": "luggage",
                  "ja": "荷物"
                },
                {
                  "text": "ticket",
                  "ja": "チケット"
                },
                {
                  "text": "passport",
                  "ja": "パスポート"
                },
                {
                  "text": "jacket",
                  "ja": "上着"
                }
              ],
              "answer": 1,
              "explanation": "自分のスーツケースではなかったので、自分のものを探しています。探しているのは luggage（荷物）です。luggage という単語は音声には出てきません。"
            },
            {
              "id": "fri-1-2",
              "lines": [
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "Are you coming to the study group tonight?",
                  "ja": "今夜の勉強会には来る？"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "I’d like to, but I have a violin lesson until eight.",
                  "ja": "行きたいけれど、8時までバイオリンのレッスンがあるの。"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "We’ll be there until ten, so come after your lesson.",
                  "ja": "10時までやっているから、レッスンのあとに来てね。"
                }
              ],
              "question": {
                "text": "What is the second speaker’s problem?",
                "ja": "2番目の話者の問題は何ですか。"
              },
              "choices": [
                {
                  "text": "schedule",
                  "ja": "予定"
                },
                {
                  "text": "health",
                  "ja": "健康"
                },
                {
                  "text": "money",
                  "ja": "お金"
                },
                {
                  "text": "distance",
                  "ja": "距離"
                }
              ],
              "answer": 0,
              "explanation": "勉強会に行きたいのに、8時までレッスンがあるため行けません。問題は予定（schedule）の重なりです。"
            },
            {
              "id": "fri-1-3",
              "lines": [
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "Excuse me, could you turn the music down a little? I’m trying to study.",
                  "ja": "すみません、音楽の音量を少し下げてもらえますか。勉強しようとしているので。"
                },
                {
                  "speaker": "Woman",
                  "gender": "female",
                  "text": "Oh, I’m sorry! I didn’t know the walls were so thin.",
                  "ja": "あら、ごめんなさい！壁がそんなに薄いとは知りませんでした。"
                },
                {
                  "speaker": "Man",
                  "gender": "male",
                  "text": "No problem. Thanks for understanding.",
                  "ja": "大丈夫です。わかってくれてありがとう。"
                }
              ],
              "question": {
                "text": "What is the man’s complaint?",
                "ja": "男性の不満は何ですか。"
              },
              "choices": [
                {
                  "text": "smell",
                  "ja": "におい"
                },
                {
                  "text": "price",
                  "ja": "値段"
                },
                {
                  "text": "noise",
                  "ja": "騒音"
                },
                {
                  "text": "temperature",
                  "ja": "温度"
                }
              ],
              "answer": 2,
              "explanation": "勉強中なので音楽の音量を下げてほしいと頼んでいます。不満は騒音（noise）です。"
            }
          ]
        },
        {
          "id": "fri-2",
          "number": 2,
          "type": "conversation",
          "questions": [
            {
              "id": "fri-2-1",
              "lines": [
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "I have to choose a second language for next year. French or Korean?",
                  "ja": "来年の第二外国語を選ばないといけないの。フランス語か韓国語か。"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "Which one do you like more?",
                  "ja": "どっちのほうが好き？"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "I like both. French is useful for travel, but the Korean class has an exchange program with a university in Seoul.",
                  "ja": "どっちも好き。フランス語は旅行に役立つけれど、韓国語のクラスにはソウルの大学との交流プログラムがあるの。"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "That sounds exciting. You could make friends there.",
                  "ja": "わくわくするわね。向こうで友だちもできるわ。"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "Exactly. But the Korean class meets at eight in the morning.",
                  "ja": "そうなの。でも韓国語のクラスは朝8時からなのよ。"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "You always say you’re not a morning person, but chances like that don’t come often.",
                  "ja": "朝は苦手だっていつも言っているけど、そういうチャンスはあまりないわよ。"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "You’re right. I’ll sign up for Korean.",
                  "ja": "その通りね。韓国語に登録するわ。"
                }
              ],
              "question": {
                "text": "Why does the first speaker choose Korean?",
                "ja": "最初の話者はなぜ韓国語を選びますか。"
              },
              "choices": [
                {
                  "text": "The class meets at a convenient time.",
                  "ja": "そのクラスは都合のよい時間にあるから。"
                },
                {
                  "text": "The language is useful for travel.",
                  "ja": "その言語は旅行に役立つから。"
                },
                {
                  "text": "The class includes an exchange program.",
                  "ja": "そのクラスには交流プログラムがあるから。"
                },
                {
                  "text": "The class is easier than French.",
                  "ja": "そのクラスはフランス語より簡単だから。"
                }
              ],
              "answer": 2,
              "explanation": "韓国語のクラスにはソウルの大学との交流プログラムがあり、そういう機会は多くないと言われて選んでいます。旅行に役立つのはフランス語、朝8時の授業は不利な点です。"
            },
            {
              "id": "fri-2-2",
              "lines": [
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "Did you check the weather for Saturday? The forecast says rain in the mountains.",
                  "ja": "土曜の天気を調べた？山では雨の予報だよ。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "Really? We planned to hike to the lake.",
                  "ja": "本当に？湖までハイキングする予定だったのに。"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "We could go on Sunday instead. It’s supposed to be sunny.",
                  "ja": "かわりに日曜に行けるよ。晴れる予報だから。"
                },
                {
                  "speaker": "Man 2",
                  "gender": "male",
                  "text": "I have a family dinner on Sunday evening, but we could start early and be home by four.",
                  "ja": "日曜の夜は家族の夕食があるけど、早く出発すれば4時には帰れるよ。"
                },
                {
                  "speaker": "Man 1",
                  "gender": "male",
                  "text": "That works. Let’s meet at the station at seven.",
                  "ja": "それならいいね。7時に駅で会おう。"
                }
              ],
              "question": {
                "text": "Why will the speakers leave early on Sunday?",
                "ja": "2人はなぜ日曜日に早く出発しますか。"
              },
              "choices": [
                {
                  "text": "The weather will be bad later.",
                  "ja": "あとで天気が悪くなるから。"
                },
                {
                  "text": "One of them has a family dinner.",
                  "ja": "どちらかが家族との夕食があるから。"
                },
                {
                  "text": "The trail will be crowded.",
                  "ja": "登山道が混むから。"
                },
                {
                  "text": "The lake closes at noon.",
                  "ja": "湖が正午に閉まるから。"
                }
              ],
              "answer": 1,
              "explanation": "日曜の夜に家族の夕食があるため、早く出発して4時には帰ろうとしています。日曜は晴れの予報なので、天気は理由ではありません。"
            }
          ]
        },
        {
          "id": "fri-3",
          "number": 3,
          "type": "talk",
          "questions": [
            {
              "id": "fri-3-1",
              "lines": [
                {
                  "speaker": "Principal",
                  "gender": "male",
                  "text": "Good morning, students. I have an important announcement about Sports Day. The weather report says it will rain heavily this Friday, so we have decided to hold the event on Monday instead. There will be no regular classes on that day, and you should come to school at the usual time wearing your gym clothes. Since the field will be wet, the relay race will be held in the gym, and the tug-of-war will be canceled. Parents who planned to attend on Friday are welcome to come on Monday, but they do not need to tell the office in advance. Please give this letter to your family tonight. Thank you for your cooperation.",
                  "ja": "生徒の皆さん、おはようございます。運動会について大切なお知らせがあります。天気予報によると今週の金曜日は大雨になるので、かわりに月曜日に行うことにしました。その日は通常の授業はなく、いつもの時間に体操服を着て登校してください。グラウンドがぬれているため、リレーは体育館で行い、綱引きは中止します。金曜日に来る予定だった保護者の方は月曜日に来ていただいて構いませんが、事前に事務室へ連絡する必要はありません。今夜、この手紙をご家族に渡してください。ご協力ありがとうございます。"
                }
              ],
              "question": {
                "text": "What will happen to the relay race?",
                "ja": "リレーはどうなりますか。"
              },
              "choices": [
                {
                  "text": "It will take place inside the gym.",
                  "ja": "体育館の中で行われる。"
                },
                {
                  "text": "It will be canceled.",
                  "ja": "中止になる。"
                },
                {
                  "text": "It will be held on Friday.",
                  "ja": "金曜日に行われる。"
                },
                {
                  "text": "It will have fewer teams.",
                  "ja": "チームの数が減る。"
                }
              ],
              "answer": 0,
              "explanation": "グラウンドがぬれているため、リレーは体育館で行われます。中止になるのは綱引きです。"
            },
            {
              "id": "fri-3-2",
              "lines": [
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "Have you heard that Ms. Taylor is leaving the company at the end of the month?",
                  "ja": "テイラーさんが月末で会社を辞めるって聞いた？"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "Yes, I’m sad about it. We should do something for her.",
                  "ja": "ええ、悲しいわ。何かしてあげたいわね。"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "I was thinking of a small party in the meeting room. We could order sandwiches.",
                  "ja": "会議室で小さなパーティーをしようかと思っていたの。サンドイッチを頼めるわ。"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "Good. But what about a gift? Everyone could give five dollars.",
                  "ja": "いいわね。でもプレゼントは？みんな5ドルずつ出せばいいわ。"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "I’m not sure money is the best idea. People have different budgets.",
                  "ja": "お金が最善とは限らないと思うの。人によって予算が違うから。"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "True. How about a card that everyone signs? We can also ask each person to write a short memory.",
                  "ja": "確かに。みんなが署名するカードはどう？一人ひとりに短い思い出も書いてもらえるわ。"
                },
                {
                  "speaker": "Woman 1",
                  "gender": "female",
                  "text": "That’s lovely. I’ll buy the card, and you could ask the others for their messages.",
                  "ja": "素敵ね。カードは私が買うから、あなたがみんなにメッセージをお願いしてくれる？"
                },
                {
                  "speaker": "Woman 2",
                  "gender": "female",
                  "text": "Sure, and I’ll ask the manager about using the meeting room.",
                  "ja": "いいわよ。それと、会議室を使えるか部長に聞いてみるわ。"
                }
              ],
              "question": {
                "text": "What will the first speaker do?",
                "ja": "最初の話者は何をしますか。"
              },
              "choices": [
                {
                  "text": "Collect five dollars from each person.",
                  "ja": "一人ずつから5ドルを集める。"
                },
                {
                  "text": "Order sandwiches for the party.",
                  "ja": "パーティー用のサンドイッチを注文する。"
                },
                {
                  "text": "Ask about using the meeting room.",
                  "ja": "会議室の利用について尋ねる。"
                },
                {
                  "text": "Buy a card for everyone to sign.",
                  "ja": "みんなが署名するカードを買う。"
                }
              ],
              "answer": 3,
              "explanation": "最初の話者は「カードは私が買う」と言っています。メッセージ集めと会議室の確認は2番目の話者が引き受けました。お金を集める案は退けられています。"
            }
          ]
        }
      ]
    }
  ]
};
