package kr.co.yht;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import org.junit.Test;

public class PressFileTest {

	@Test
	public void test() {

		// ZipInputStream zipIs = new ZipInputStream(in);

	}

	public static void testFileZipComplex() throws IOException {
		String szInputFile1 = "C:\\Documents and Settings\\bluejames\\My Documents\\문건들\\POI관련";
		String szGZipTemp = "C:\\Documents and Settings\\bluejames\\My Documents\\문건들\\POI관련\\POI.zip";

		File inFile1 = new File(szInputFile1);
		File inDirectory;
		if (inFile1.isDirectory()) {
			inDirectory = new File(szInputFile1);
		} else {
			inDirectory = new File(inFile1.getParent());
		}

		File[] inFile = inDirectory.listFiles();
		FileInputStream fis = null;

		File gzipFile = new File(szGZipTemp);
		FileOutputStream fos = new FileOutputStream(gzipFile);
		ZipOutputStream zos = new ZipOutputStream(fos);

		ZipEntry ze = null;
		// ZipEntry ze = null;

		byte[] buffer = new byte[1024 * 8];
		int nRead;

		try {
			for (int i = 0; i < inFile.length; i++) {
				fis = new FileInputStream(inFile[i]);

				ze = new ZipEntry(inFile[i].getName());
				// ze = new ZipEntry ( inFile[i].getName());

				System.out.println("압축할 파일명 : " + inFile[i].getName() + ", 파일사이즈 : " + fis.available());
				zos.putNextEntry(ze);
				// 압축 레벨을 정하는것인데 9는 가장 높은 압축률을 나타냅니다.

				// 그 대신 속도는 젤 느리죠. 디폴트는 8입니다.

				zos.setLevel(9);
				buffer = new byte[1024 * 8];
				nRead = 0;
				while ((nRead = fis.read(buffer)) != -1) {
					zos.write(buffer, 0, nRead);
				}
				fis.close();
				zos.closeEntry();
			}
			zos.close();
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				fis.close();
			} catch (Exception e) {
			}
			try {
				zos.close();
			} catch (Exception e) {
			}
			try {
				fos.close();
			} catch (Exception e) {
			}
		}
	}
}
