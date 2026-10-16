"""Rebuild sourced fee context, keeping estimates separate from published course tuition.
Run after registry refresh. Downloads official source snapshots into audit/tuition.
"""
import csv, io, json, urllib.request, zipfile
from pathlib import Path
ROOT=Path('public/data/universities'); CACHE=Path('audit/tuition'); CACHE.mkdir(parents=True,exist_ok=True)
FR='https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-cartographie_formations_parcoursup/exports/csv?where=annee%3D%272026%27'
US='https://nces.ed.gov/ipeds/datacenter/data/IC2023_AY.zip'
def snapshot(url,name):
 p=CACHE/name
 if not p.exists(): p.write_bytes(urllib.request.urlopen(url,timeout=180).read())
 return p.read_bytes()
def write(country,data):
 (ROOT/f'{country}-fee-context.json').write_text(json.dumps({'reviewedAt':'2026-10-16',**data},ensure_ascii=False,separators=(',',':'))+'\n')
rows=csv.DictReader(io.StringIO(snapshot(FR,'parcoursup-2026.csv').decode('utf-8-sig')),delimiter=';')
context={}
for r in rows:
 context['fr-course-2026-'+str(r.get('gta') or r.get('gti'))]={'sector':r.get('tc',''),'apprenticeship':'apprentissage' in r.get('app','').lower(),'courseUrl':r.get('fiche','')}
write('france',{'sourceUrl':FR,'courses':context})
z=zipfile.ZipFile(io.BytesIO(snapshot(US,'IC2023_AY.zip')))
rows=csv.DictReader(io.StringIO(z.read(z.namelist()[0]).decode('utf-8-sig')))
context={}; pools={'undergraduate':[],'graduate':[],'professional':[]}
def value(r,k):
 try: return float(r[k]) if float(r[k])>=0 else None
 except (ValueError,KeyError):return None
def total(r,t,f):
 a=value(r,t);b=value(r,f)
 return a+b if a is not None and b is not None and a+b>0 else None
for r in rows:
 out={}
 for level,t,f in [('undergraduate','TUITION3','FEE3'),('graduate','TUITION7','FEE7')]:
  n=total(r,t,f)
  if n is not None:out[level]=n;pools[level].append(n)
 for i in range(1,10):
  n=total(r,'OSPROF'+str(i),'OSPFEE'+str(i))
  if n is not None:out['professional'+str(i)]=n;pools['professional'].append(n)
 if out:context['us-'+r['UNITID']]=out
ranges={}
for k,values in pools.items():
 values.sort();ranges[k]={'low':round(values[int((len(values)-1)*.1)]),'high':round(values[int((len(values)-1)*.9)]),'count':len(values)}
write('usa',{'sourceUrl':US,'academicYear':'2023–24','institutions':context,'ranges':ranges})
print('Fee context: France',len(json.load(open(ROOT/'france-fee-context.json'))['courses']),'USA',len(context),'institutions; ranges',ranges)
