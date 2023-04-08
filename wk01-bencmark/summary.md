# Bencmark

## Solana

### Test
The testing script send sol from GHUmnYKusfr8Y9W3t3NcckZsEatZkLqZMsTdpsScrw3i to 100 addresses by:

1. using address lookup table 
2. repeating each transaction 10 times, so 1000 times are sent in total


```
[
  '5FW33sQXxJfe9CtixhCw9VaGwnA2qYBMw7SSDeCVyLQa9cXT3AEts66XupX6guhm2Kv1mMQeERPw4akMPP2mjBmz',
  '2zEhBUopQsaLChd8QLdnJC6bdfW9wWpXftKM3K2sBcstywF3ET2s32K4XeJca2HrKR25JrufayFwC5M9LN2m7UEy',
  '4XAsrWYqnV7xUSaBa3GP3Ln8ASRmYEDJbipLUK3MtQsHj3bkJPwUrM56QHp3WCvtePo6pLaZFn6AW15UqWEgfePH',
  '2uRCMdUrFoFwcaGZ62bPkKyY2kDxte5kcnvtYZfCZNsCRtXexRwYjPQe9JK4RXGEypeWDfui4zeNAEstFoQv4NsW',
  '4sXxwDRJALSndB4gHbCmJsKyfhRKgTyxeb8wkxCrq9BVvq1ERQCQLSRdqGLs5HvG6Zqi5YBJaAUVrn92MtyqV2kC',
  '3sxstPgY8hA5P6HmM5235cooT1df9NvydJdm9qP3QNQw3QTcA1QLKE5hccgJGLngNYkGFi68VG8Dye8PDfXpg4ZH',
  'EryoeaRDPiduNMF1ZpMdddgTPDLVmZb3TZzaFCunhR5Ljjhz3zPK3wtbRshFrE9DuTrd9c147AGgQyps7yCnHeo',
  'DjMiCqFGEnm7oxC6x9qyjaSNgR9dAik8R8DbShmWCAszQhks1VUWQc8KgXPtuZimqKyCgRCrmpjYYjVRQHPcDMv',
  '3h82XwxA4tN818h9GzKagNSevaG5WvveUQSnEeSG8fmBkjX5ovbvaixf4znbTrv6dgNyeRKtx7erXyyHFXvLZgMr',
  '3F6mJe9mEwwn8Wj89Que5MTBWpACMMW7EapqnAiZE2xHVAo2v5K14oY4KVqGEi8Y9DPvBFmzTZErUeVTd37GpnYk',
  '3oUZ1vhhHVeRJpYQ4t1r7EgwdecRDCt1FWV2hs2CQ2JPRoqQDKLCE6Xh5vhAtYsueTuqbXKSfPjK1dM1T4ga8kWZ',
  'srt1n5QKYz41e29AZ9cdf6ksTbLwDgehfawueRDt9yArD8BChMJQAXLKTF99HRKeZq8r2581VDMocE1aTpRL7na',
  'CpHjzk9czyaLRNvvhus7vMwvireQERf8dg3HdqCz472JP6m5LPqNsubdwQTqR9ffRYJcyfPRGU9xgcBpxajCyTF',
  '4StJD28snjT5mutDwMpgpZ8UnSkbzhdLcAtfGob6Yqn4i41g4vqjCisRJR1yxxHv7SyAFDxfokCJQcgLhGD2JpGE',
  '2YEyEMyR9y6HuiYCxKJ4ET43YGdVJfh2aSuMnovf9hHtfDFGsyotU3aP2qKRBPQLTd3B4JhbBrpnHvJbD82zQzir',
  '5knpygxamrudupDx9XT8NLUbRhXAtTQLBuX4EbS41QkNiopzMYLViNt8wjqgBZqLpCKWruC6MzBqo3umViyjg57b',
  '32ydiuaZLUcuAscLKnuAE61KJShp5FUJCPM49EmvgJ6A5oAXbg7p8DQBPPBYCFZ5VTjqarhqasqdeBBVGe9rpVgK',
  '2BV1hmt66XeiokHbSTSHEgXbkGUPXu9LnFfYGirqPm3r6WJLfj9BNLC1KjxMU3q4KRU3PexPohLneZVx69pEu3E5',
  '7ZcHD7XzeKbnkjcvTsMFhF4eExjUMs3PwxTSnQzr7m8oJtAhgZE2i7m9BHdbF46tJDBjhbgtBLuvrtyvB3cpi36',
  '3p5wLQr3YcMmgoaRLPg3WZ12uoFGBNhH1aDjgwf5B3mSDNJ6BiRJ4iNMSiYanS3wU7Z4ZsgftWG8SXXh1Dx1ieJp'
]
2023-04-08T03:39:25.216Z
2023-04-08T03:39:26.300Z
1084
```

### Result
1. Transaction used:
   Address look up table (1 + 5) = 6
   Send sol = 20
   Total: 20 + 6 = 26

2. Blocks created:
    Address lookup table: 6
    Transaction: 3
    Total: 9

3. Time used: 1084ms

4. Transaction fee: 0.000005 * 16 = 0.00013 SOL

## Polygon

### Test

Send MATIC from 0xbeb6cb23a776f4fbc592a45c06d6069a696cdfd5 to 10 addresses.
Since ERC20 does not support batch processing. I can only send them one by one.

```
MATIC balance: 494570324964743462
0xea70cd70b417ed27d676dfd0f853fe5b17a1126fc629c01f07dfbeb3bc67d505
0xce6d2b62c3fbb0cae5200cb542cf3fc6ee2ac515908429d683cb69abb1d10d7b
0x8ea0dfd5b4ed5800deb32e87d45c57085e83d639d99739036838e5b896fcb690
0xa6765212c7ec269c1c932cb82cdd1aa8968304d11748c1e2ebe1db33074ffc9a
0x5f037ab97aaeeb8c80eeb6afe2a31585fb2759686e0239d56d25c67a36e43f77
0x7fb22594ae4a86bb636d81464b89594e6b442a5625ff24603df7dd2e9bab7104
0x15d134c27aae88934616992bcb4d8e9d312b6ac1efb014dcf9a590599d67423d
0xaf74d9199ac498f6db3cc163c3ff29a68667dc960428722a18ea0912ece134af
0xbc27c9eee81877c2e3b5191904d9d77860de2e60bc854d7438a0ebe26c233961
0x230db389e3e8415e56868058c0021544461bbd7bdebf705ff13f8b1d9f4ff984
2023-04-08T03:56:06.998Z
2023-04-08T03:56:50.982Z
43984
```

### Result
1. Transaction used:
   Send MATIC = 10 

2. Blocks created: 10

3. Time used: 43984ms

4. Transaction fee: 0.0001064175 * 10 = 0.001064175 MATIC

## Comparison 

| -    | Solana | Polygon |
|---------------- | --------------- | --------------- |
| Transaction used    | 26    | 1000    |
| Blocks created    | 9    | 1000    |
| Time used   | 1084ms   | 4398400ms   |
| Transaction fee   |  0.00013 SOL  | 0.1064175 MATIC   |
| Transaction fee in USD   |  0.00013 * $20.77 = $0.0027   | 0.1064175 * $1.13 = $0.12025 |


